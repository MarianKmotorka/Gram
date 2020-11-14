import { useEffect, useState } from 'react'
import { IPost, IUser } from '../../../domain'
import { useNotifyError, useStorage } from '../../../hooks'
import {
  FieldValue,
  getTimestamp,
  projectFirestore,
} from '../../../firebase/firebaseConfig'
import { useApiError } from '../../../contextProviders/ApiErrorProvider'
import { propertyOf } from '../../../utils/utils'

const useUplaodPost = (
  image: File | null,
  post: Omit<IPost, 'id' | 'createdAt' | 'imageUrl'>,
  onDone?: () => void
) => {
  const [uploading, setUploading] = useState(false)
  const { progress, error, url } = useStorage(image, uploading)
  useNotifyError(error && { code: error.name, message: error.message })
  const { setError } = useApiError()

  useEffect(() => {
    const createPost = async () => {
      if (!url) return

      const newPost: Omit<IPost, 'id'> = {
        imageUrl: url,
        title: post.title,
        likes: post.likes,
        userId: post.userId,
        userNick: post.userNick,
        description: post.description || '',
        userPhotoUrl: post.userPhotoUrl || '',
        createdAt: getTimestamp() as firebase.firestore.Timestamp,
      }

      const { increment } = FieldValue

      await Promise.all([
        projectFirestore.collection('posts').add(newPost),
        projectFirestore
          .doc(`users/${post.userId}`)
          .update({ [propertyOf<IUser>('postCount')]: increment(1) }),
      ]).catch(setError)

      onDone && onDone()
    }

    createPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {
    progress,
    uploading,
    uploadError: error,
    startUpload: () => setUploading(true),
  }
}

export default useUplaodPost
