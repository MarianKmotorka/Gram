import { useState, useEffect } from 'react'
import { projectFirestore } from '../config/firebaseConfig'

const useFirestore = <T>(
  collectionName: string
): [T[], boolean, firebase.firestore.FirestoreError | undefined] => {
  const [docs, setDocs] = useState<Array<T>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | undefined>()

  const onNext = (
    snap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    let documents: any = []
    snap.forEach(doc => {
      documents.push({ ...doc.data(), id: doc.id })
    })
    setDocs(documents)
    setLoading(false)
  }

  const onError = (err: firebase.firestore.FirestoreError) => {
    setError(err)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setError(undefined)

    const unsub = projectFirestore.collection(collectionName).onSnapshot(onNext, onError)

    return () => {
      unsub()
      setLoading(false)
    }
  }, [collectionName])

  return [docs, loading, error]
}

export default useFirestore
