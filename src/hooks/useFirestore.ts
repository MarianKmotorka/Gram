import { useState, useEffect } from 'react'
import { projectFirestore } from '../config/firebaseConfig'

const useFirestore = <T>(collectionName: string): [T[], boolean] => {
  const [docs, setDocs] = useState<Array<T>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const unsub = projectFirestore
      .collection(collectionName)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents: any = []
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id })
        })
        setDocs(documents)
        setLoading(false)
      })

    return () => {
      unsub()
      setLoading(false)
    }
  }, [collectionName])

  return [docs, loading]
}

export default useFirestore
