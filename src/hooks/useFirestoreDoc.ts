import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/firebaseConfig'

type FirestoreError = firebase.firestore.FirestoreError
type Snapshot = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
type Response<T> =
  | { loading: true }
  | { loading: false; error: FirestoreError }
  | { loading: false; error: undefined; data: T }

/**
 *
 * @param getDoc Function that returns a document query, that will be run against firebase - needs to be wrapped in useCallback
 * @param startFetching Starts fetching only if set to true
 */
const useFirestoreDoc = <T>(
  getDoc: (query: firebase.firestore.Firestore) => Snapshot,
  startFetching: boolean = true
): Response<T> => {
  const [state, setState] = useState<Response<T>>({ loading: true })

  const onNext = (
    snap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => {
    const data: any = { ...snap.data(), id: snap.id }

    if (snap.exists) setState(x => ({ ...x, loading: false, error: undefined, data }))
    else
      setState(x => ({
        ...x,
        loading: false,
        error: { message: 'Data not found' } as FirestoreError,
      }))
  }

  const onError = (error: FirestoreError) =>
    setState(x => ({ ...x, loading: false, error }))

  useEffect(() => {
    if (!startFetching) return

    setState(x => ({ ...x, loading: true, error: undefined }))
    const unsub = getDoc(projectFirestore).onSnapshot(onNext, onError)

    return () => unsub()
  }, [getDoc, startFetching])

  return state
}

export default useFirestoreDoc
