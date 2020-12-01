import { propertyOf } from '../utils'
import { IComment, IPost, IUser } from '../domain'
import { SetError } from '../contextProviders/ApiErrorProvider'
import {
  FieldValue,
  getTimestamp,
  projectFirestore as db,
  projectStorage as storage,
} from '../firebase/firebaseConfig'

export const isLiked = (post: IPost, nick: IUser['nick']) =>
  (!!nick && post.likes.includes(nick)) || false

export const likePost = async (post: IPost, nick: IUser['nick']) => {
  const { arrayUnion, arrayRemove } = FieldValue
  const liked = isLiked(post, nick)
  const arrayOperation = liked ? arrayRemove : arrayUnion

  await db.doc(`posts/${post.id}`).update({ likes: arrayOperation(nick) })
}

export const deletePost = async (post: IPost, setError: SetError) => {
  const { increment } = FieldValue

  const comments = await db
    .collection('comments')
    .where(propertyOf<IComment>('postId'), '==', post.id)
    .get()

  const batch = db.batch()

  comments.forEach(x => batch.delete(x.ref))
  batch.delete(db.collection('posts').doc(post.id))
  batch.update(db.doc(`users/${post.userId}`), {
    [propertyOf<IUser>('postCount')]: increment(-1),
  })

  await batch.commit().catch(setError)
  await storage.refFromURL(post.mediaUrl).delete().catch(setError)
}

export const commentOnPost = async (
  comment: Omit<IComment, 'id' | 'timestamp'>,
  setError: SetError
) => {
  const data: Omit<IComment, 'id'> = {
    ...comment,
    timestamp: getTimestamp(),
  }

  const { increment } = FieldValue
  const batch = db.batch()

  batch.set(db.collection('comments').doc(), data)
  batch.update(db.collection('posts').doc(comment.postId), {
    [propertyOf<IPost>('commentCount')]: increment(1),
  })

  await batch.commit().catch(setError)
}

export const deleteComment = async (id: string, postId: string, setError: SetError) => {
  const { increment } = FieldValue
  const batch = db.batch()

  batch.delete(db.doc(`comments/${id}`))
  batch.update(db.collection('posts').doc(postId), {
    [propertyOf<IPost>('commentCount')]: increment(-1),
  })

  await batch.commit().catch(setError)
}
