import { useState, useEffect } from 'react'
import { projectStorage } from '../config/firebaseConfig'
import { useAuthContext } from '../contextProviders/AuthProvider'

const useStorage = (file?: File | null, startUpload: boolean = true) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const { user } = useAuthContext()

  useEffect(() => {
    if (!file || !startUpload) return

    const storageRef = projectStorage.ref(file.name + user?.uid + Date.now().toString())

    const unsub = storageRef.put(file).on(
      'state_changed',
      snap => setProgress((snap.bytesTransferred / snap.totalBytes) * 100),
      err => setError(err),
      async () => setUrl(await storageRef.getDownloadURL())
    )

    return () => unsub()
  }, [file, user, startUpload])

  return { progress, url, error }
}

export default useStorage
