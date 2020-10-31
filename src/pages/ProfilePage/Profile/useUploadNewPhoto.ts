import { useCallback, useEffect, useState } from 'react'
import { projectFirestore, projectStorage } from '../../../config/firebaseConfig'
import { IPost, IUser } from '../../../domain'
import { useStorage } from '../../../hooks'
import { propertyOf } from '../../../utils/utils'

const useUploadNewPhoto = (
  file: File | null,
  userId: string,
  oldPhotoUrl?: string | null
) => {
  const [uploading, setUploading] = useState(false)
  const { progress, url: newPhotoUrl } = useStorage(file, uploading, {
    maxWidthOrHeight: 500,
  })

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

  useEffect(() => {
    const deleteOldPhotoAndUpdateUser = async () => {
      if (oldPhotoUrl) await projectStorage.refFromURL(oldPhotoUrl).delete()

      await projectFirestore
        .doc(`users/${userId}`)
        .set({ [propertyOf<IUser>('photoUrl')]: newPhotoUrl }, { merge: true })

      await updateExistingPosts()
      setUploading(false)
    }

    if (newPhotoUrl && newPhotoUrl !== oldPhotoUrl) deleteOldPhotoAndUpdateUser()
  }, [newPhotoUrl, oldPhotoUrl, file, userId, updateExistingPosts])

  return { uploading, progress, startUploading: () => setUploading(true) }
}

export default useUploadNewPhoto
