import { useState, useEffect } from 'react'
import imageCompression from 'browser-image-compression'

import { projectStorage } from '../firebase/firebaseConfig'
import { useAuthorizedUser } from '../contextProviders/AuthProvider'

interface ICompressionOptions {
  maxSizeMB?: number
  maxWidthOrHeight?: number
}

const defaultOptions: ICompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
}

const useStorage = (
  file?: File | null,
  startUpload: boolean = true,
  compressionOptions?: ICompressionOptions
) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const auth = useAuthorizedUser()

  useEffect(() => {
    let unsub: Function = () => {}

    const upload = async () => {
      const storageRef = projectStorage.ref(
        `${auth.authUser.uid}${Date.now()}${file!.name}`
      )

      const compressedFile = await imageCompression(
        file!,
        compressionOptions || defaultOptions
      )

      unsub = storageRef.put(compressedFile).on(
        'state_changed',
        snap => setProgress((snap.bytesTransferred / snap.totalBytes) * 100),
        err => setError(err),
        async () => setUrl(await storageRef.getDownloadURL())
      )
    }

    if (file && startUpload) upload()

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, auth.authUser.uid, startUpload, JSON.stringify(compressionOptions)])

  return { progress, url, error }
}

export default useStorage
