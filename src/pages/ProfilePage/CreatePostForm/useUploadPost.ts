import { useEffect, useState } from 'react'
import { IPost, IUser } from '../../../domain'
import { useStorage } from '../../../hooks'
import {
  FieldValue,
  getTimestamp,
  projectFirestore as db,
} from '../../../firebase/firebaseConfig'
import { propertyOf } from '../../../utils'

const useUplaodPost = (
  folderName: string,
  file: File | null,
  post: Omit<IPost, 'id' | 'createdAt' | 'imageUrl' | 'likes' | 'commentCount'>,
  onDone?: () => void
) => {
  const [uploading, setUploading] = useState(false)
  const { progress, error: storageError, url } = useStorage(folderName, file, uploading)
  const [createPostError, setCreatePostError] = useState<Error | null>(null)

  useEffect(() => {
    const createPost = async () => {
      if (!url) return

      const newPost: Omit<IPost, 'id'> = {
        likes: [],
        imageUrl: url,
        commentCount: 0,
        title: post.title,
        userId: post.userId,
        userNick: post.userNick,
        description: post.description || '',
        userPhotoUrl: post.userPhotoUrl || '',
        createdAt: getTimestamp() as firebase.firestore.Timestamp,
      }

      const { increment } = FieldValue
      const batch = db.batch()

      batch.set(db.collection('posts').doc(), newPost)
      batch.update(db.doc(`users/${post.userId}`), {
        [propertyOf<IUser>('postCount')]: increment(1),
      })

      await batch.commit().catch(setCreatePostError)
      onDone && onDone()
    }

    createPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const uploadError = storageError || createPostError

  return {
    progress,
    uploadError,
    uploading: uploading && !uploadError,
    startUpload: () => setUploading(true),
  }
}

export default useUplaodPost
