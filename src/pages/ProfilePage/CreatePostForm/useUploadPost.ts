import { useEffect, useState } from 'react'
import { IPost } from '../../../domain'
import { useStorage } from '../../../hooks'
import { getTimestamp, projectFirestore } from '../../../config/firebaseConfig'

const useUplaodPost = (
  image: File | null,
  post: Omit<IPost, 'id' | 'createdAt' | 'imageUrl'>,
  onDone?: () => void
) => {
  const [uploading, setUploading] = useState(false)
  const { progress, error, url } = useStorage(image, uploading)

  useEffect(() => {
    const createPost = async () => {
      if (!url) return

      const newPost: Omit<IPost, 'id'> = {
        imageUrl: url,
        title: post.title,
        userId: post.userId,
        userNick: post.userNick,
        description: post.description,
        userPhotoUrl: post.userPhotoUrl || null,
        createdAt: getTimestamp() as firebase.firestore.Timestamp,
      }

      await projectFirestore.collection('posts').add(newPost)
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
