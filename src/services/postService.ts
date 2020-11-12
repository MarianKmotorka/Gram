import { IPost, IUser } from '../domain'
import { FieldValue, projectFirestore, projectStorage } from '../firebase/firebaseConfig'
import { IError } from '../contextProviders/ApiErrorProvider'
import { propertyOf } from '../utils/utils'

export const isLiked = (post: IPost, nick: IUser['nick']) =>
  (!!nick && post.likes.includes(nick)) || false

export const likePost = async (post: IPost, nick: IUser['nick']) => {
  const { arrayUnion, arrayRemove } = FieldValue
  const liked = isLiked(post, nick)
  const arrayOperation = liked ? arrayRemove : arrayUnion

  await projectFirestore.doc(`posts/${post.id}`).update({ likes: arrayOperation(nick) })
}

export const deletePost = async (post: IPost, setError: (err: IError) => void) => {
  const { increment } = FieldValue

  await Promise.all([
    projectStorage.refFromURL(post.imageUrl).delete(),
    projectFirestore.collection('posts').doc(post.id).delete(),
    projectFirestore
      .doc(`users/${post.userId}`)
      .update({ [propertyOf<IUser>('postCount')]: increment(-1) }),
  ]).catch(setError)
}
