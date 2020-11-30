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
  folderName: string,
  file?: File | null,
  startUpload: boolean = true,
  compressionOptions?: ICompressionOptions
) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const auth = useAuthorizedUser()

  const handleError = (err: Error) => {
    setError(err)
    setProgress(0)
  }

  useEffect(() => {
    let unsub: Function = () => {}

    const upload = async () => {
      if (!file || !startUpload) return

      const storageRef = projectStorage.ref(
        `${folderName}/${auth.authUser.uid}${Date.now()}${file.name}`
      )

      const compressedFile = file.type.startsWith('image/')
        ? await imageCompression(file, compressionOptions || defaultOptions)
        : file

      unsub = storageRef.put(compressedFile).on(
        'state_changed',
        snap => setProgress((snap.bytesTransferred / snap.totalBytes) * 100),
        handleError,
        async () => setUrl(await storageRef.getDownloadURL())
      )
    }

    upload()

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, auth.authUser.uid, startUpload, JSON.stringify(compressionOptions)])

  return { progress, url, error }
}

export default useStorage
