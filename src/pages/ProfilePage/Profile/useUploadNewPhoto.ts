import { useCallback, useEffect, useState } from 'react'

import { IComment, IPost, IUser } from '../../../domain'
import { propertyOf } from '../../../utils'
import { useNotifyError, useStorage } from '../../../hooks'
import { projectFirestore, projectStorage } from '../../../firebase/firebaseConfig'
import { useApiError } from '../../../contextProviders/ApiErrorProvider'

const useUploadNewPhoto = (
  file: File | null,
  userId: string,
  oldPhotoUrl?: string | null
) => {
  const [uploading, setUploading] = useState(false)
  const { progress, url: newPhotoUrl, error: uploadError } = useStorage(file, uploading, {
    maxWidthOrHeight: 500,
  })

  const { setError } = useApiError()
  useNotifyError(uploadError && { code: uploadError.name, message: uploadError.message })

  const updateExistingPosts = useCallback(async () => {
    const postsSnapshot = await projectFirestore
      .collection('posts')
      .where(propertyOf<IPost>('userId'), '==', userId)
      .get()

    await Promise.all(
      postsSnapshot.docs.map(x =>
        x.ref.set({ [propertyOf<IPost>('userPhotoUrl')]: newPhotoUrl }, { merge: true })
      )
    )
  }, [userId, newPhotoUrl])

  const updateExistingComments = useCallback(async () => {
    const comments = await projectFirestore
      .collection('comments')
      .where(propertyOf<IComment>('userId'), '==', userId)
      .get()

    await Promise.all(
      comments.docs.map(x =>
        x.ref.set(
          { [propertyOf<IComment>('userPhotoUrl')]: newPhotoUrl },
          { merge: true }
        )
      )
    )
  }, [userId, newPhotoUrl])

  useEffect(() => {
    const deleteOldPhotoAndUpdateUser = async () => {
      if (oldPhotoUrl) {
        await projectStorage
          .refFromURL(oldPhotoUrl)
          .delete()
          .catch(() => setError({ message: 'problem with deleting old photo' }))
      }

      await projectFirestore
        .doc(`users/${userId}`)
        .set({ [propertyOf<IUser>('photoUrl')]: newPhotoUrl }, { merge: true })

      await updateExistingPosts()
      await updateExistingComments()
      setUploading(false)
    }

    if (newPhotoUrl && newPhotoUrl !== oldPhotoUrl) deleteOldPhotoAndUpdateUser()
  }, [
    newPhotoUrl,
    oldPhotoUrl,
    file,
    userId,
    updateExistingPosts,
    updateExistingComments,
    setError,
  ])

  return { uploading, progress, startUploading: () => setUploading(true) }
}

export default useUploadNewPhoto
