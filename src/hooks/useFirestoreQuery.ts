import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/firebaseConfig'

/**
 * @param getQuery Function that returns a query, that will be run against firebase - needs to be wrapped in useCallback
 * @param startFetching Starts fetching only if set to true
 */
const useFirestoreQuery = <T>(
  getQuery: (
    query: firebase.firestore.Firestore
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>,
  startFetching: boolean = true
): [
  T[],
  boolean,
  firebase.firestore.FirestoreError | undefined,
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[],
  () => void
] => {
  const [docs, setDocs] = useState<Array<T>>([])
  const [loading, setLoading] = useState(startFetching)
  const [refreshObject, setRefreshObject] = useState({})
  const [error, setError] = useState<firebase.firestore.FirestoreError | undefined>()

  const [firebaseDocs, setFirebaseDocs] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([])

  const mapDocs = (
    snap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    let documents: any = []
    snap.forEach(doc => {
      documents.push({ ...doc.data(), id: doc.id })
    })
    setDocs(documents)
    setFirebaseDocs(snap.docs)
    setLoading(false)
  }

  const onError = (err: firebase.firestore.FirestoreError) => {
    setError(err)
    setLoading(false)
  }

  const refresh = () => setRefreshObject(prev => ({ ...prev }))

  useEffect(() => {
    if (!startFetching) return

    setLoading(true)
    setError(undefined)
    getQuery(projectFirestore).get().then(mapDocs).catch(onError)

    return () => {
      setLoading(false)
    }
  }, [getQuery, startFetching, refreshObject])

  return [docs, loading, error, firebaseDocs, refresh]
}

export default useFirestoreQuery
