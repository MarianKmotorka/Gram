import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore, getTimestamp } from '../config/firebaseConfig'

const useStorage = (file: File) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name)
    const collectionRef = projectFirestore.collection('images')

    storageRef.put(file).on(
      'state_changed',
      snap => setProgress((snap.bytesTransferred / snap.totalBytes) * 100),
      err => setError(err),
      async () => {
        const url = await storageRef.getDownloadURL()
        const createdAt = getTimestamp()
        await collectionRef.add({ url, createdAt })
        setUrl(url)
      }
    )
  }, [file])

  return { progress, url, error }
}

export default useStorage
