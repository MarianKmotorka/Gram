import { propertyOf } from '../utils/utils'
import { IComment, IPost, IUser } from '../domain'
import { IError } from '../contextProviders/ApiErrorProvider'
import {
  FieldValue,
  getTimestamp,
  projectFirestore,
  projectStorage,
} from '../firebase/firebaseConfig'

type SetError = (err: IError) => void

export const isLiked = (post: IPost, nick: IUser['nick']) =>
  (!!nick && post.likes.includes(nick)) || false

export const likePost = async (post: IPost, nick: IUser['nick']) => {
  const { arrayUnion, arrayRemove } = FieldValue
  const liked = isLiked(post, nick)
  const arrayOperation = liked ? arrayRemove : arrayUnion

  await projectFirestore.doc(`posts/${post.id}`).update({ likes: arrayOperation(nick) })
}

export const deletePost = async (post: IPost, setError: SetError) => {
  const { increment } = FieldValue

  await Promise.all([
    projectStorage.refFromURL(post.imageUrl).delete(),
    projectFirestore.collection('posts').doc(post.id).delete(),
    projectFirestore
      .doc(`users/${post.userId}`)
      .update({ [propertyOf<IUser>('postCount')]: increment(-1) }),
  ]).catch(setError)
}

export const commentOnPost = async (
  comment: Omit<IComment, 'id' | 'timestamp'>,
  postId: string,
  setError: SetError
) => {
  const data: Omit<IComment, 'id'> = {
    ...comment,
    timestamp: getTimestamp(),
  }

  await projectFirestore.collection(`posts/${postId}/comments`).add(data).catch(setError)
}
