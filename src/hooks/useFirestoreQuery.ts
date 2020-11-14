import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/firebaseConfig'

type Config = { realTime?: boolean; startFetching?: boolean }

/**
 * @param getQuery Function that returns a query, that will be run against firebase - needs to be wrapped in useCallback
 * @param startFetching Starts fetching only if set to true
 * @param realTime Whether data should be updated in real time
 */
const useFirestoreQuery = <T>(
  getQuery: (
    query: firebase.firestore.Firestore
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>,
  config: Config = {}
): [
  T[],
  boolean,
  firebase.firestore.FirestoreError | undefined,
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[],
  () => void
] => {
  const [docs, setDocs] = useState<Array<T>>([])
  const [loading, setLoading] = useState(true)
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
    if (config.startFetching === false) return

    setLoading(true)
    setError(undefined)
    let unsub: Function = () => {}

    if (config.realTime === false)
      getQuery(projectFirestore).get().then(mapDocs).catch(onError)
    else {
      unsub = getQuery(projectFirestore).onSnapshot(mapDocs, onError)
    }

    return () => {
      setLoading(false)
      unsub()
    }
  }, [getQuery, config.startFetching, config.realTime, refreshObject])

  return [docs, loading, error, firebaseDocs, refresh]
}

export default useFirestoreQuery
