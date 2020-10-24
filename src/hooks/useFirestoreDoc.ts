import { useState, useEffect } from 'react'
import { projectFirestore } from '../config/firebaseConfig'

/**
 *
 * @param getDoc Function that returns a document query, that will be run against firebase - needs to be wrapped in useCallback
 * @param startFetching Starts fetching only if set to true
 */
const useFirestoreDoc = <T>(
  getDoc: (
    query: firebase.firestore.Firestore
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  startFetching: boolean = true
): [T | undefined, boolean, firebase.firestore.FirestoreError | undefined] => {
  const [doc, setDoc] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<firebase.firestore.FirestoreError | undefined>()

  const onNext = (
    snap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => {
    const result: any = { ...snap.data(), id: snap.id }

    if (snap.exists) setDoc(result)
    else setError({ message: 'Not found' } as firebase.firestore.FirestoreError)

    setLoading(false)
  }

  const onError = (err: firebase.firestore.FirestoreError) => {
    setError(err)
    setLoading(false)
  }

  useEffect(() => {
    if (!startFetching) return

    setLoading(true)
    setError(undefined)
    const unsub = getDoc(projectFirestore).onSnapshot(onNext, onError)

    return () => {
      unsub()
      setLoading(false)
    }
  }, [getDoc, startFetching])

  return [doc, loading, error]
}

export default useFirestoreDoc
