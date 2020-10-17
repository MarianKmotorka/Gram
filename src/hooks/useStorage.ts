import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore, getTimestamp } from '../config/firebaseConfig'
import { useAuthContext } from '../contextProviders/AuthProvider'

const useStorage = (file: File | null | undefined) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const { user } = useAuthContext()

  useEffect(() => {
    if (!file) return

    const storageRef = projectStorage.ref(file.name + user?.uid + Date.now().toString())
    const collectionRef = projectFirestore.collection('posts')

    const unsub = storageRef.put(file).on(
      'state_changed',
      snap => setProgress((snap.bytesTransferred / snap.totalBytes) * 100),
      err => setError(err),
      async () => {
        const imageUrl = await storageRef.getDownloadURL()
        const createdAt = getTimestamp()
        await collectionRef.add({ imageUrl, createdAt, userId: user?.uid }) // create rule for uid cannot be null
        setUrl(imageUrl)
      }
    )

    return () => unsub()
  }, [file, user])

  return { progress, url, error }
}

export default useStorage
