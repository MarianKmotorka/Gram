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

  const deletePostComments = async () => {
    const comments = await projectFirestore
      .collection('comments')
      .where(propertyOf<IComment>('postId'), '==', post.id)
      .get()
    comments.forEach(async x => await x.ref.delete())
  }

  await Promise.all([
    projectStorage.refFromURL(post.imageUrl).delete(),
    projectFirestore.collection('posts').doc(post.id).delete(),
    deletePostComments(),
    projectFirestore
      .doc(`users/${post.userId}`)
      .update({ [propertyOf<IUser>('postCount')]: increment(-1) }),
  ]).catch(setError)
}

export const commentOnPost = async (
  comment: Omit<IComment, 'id' | 'timestamp'>,
  setError: SetError
) => {
  const data: Omit<IComment, 'id'> = {
    ...comment,
    timestamp: getTimestamp(),
  }

  await projectFirestore.collection('comments').add(data).catch(setError)
}

export const deleteComment = async (id: string, setError: SetError) => {
  await projectFirestore.doc(`comments/${id}`).delete().catch(setError)
}
