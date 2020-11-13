import { useState, useEffect, useMemo, useCallback } from 'react'
import { projectFirestore } from '../firebase/firebaseConfig'

type FirestoreError = firebase.firestore.FirestoreError
type Snapshot = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
type Actions = { refresh: () => void }
type Config = { realTime?: boolean; startFetching?: boolean }
type Data<T> =
  | { loading: true }
  | { loading: false; error: FirestoreError }
  | { loading: false; error: undefined; data: T; fetching: boolean } // loading is true only once, fetching is true when refreshing

/**
 * @param query Function that returns a document query, that will be run against firebase - needs to be wrapped in useCallback
 * @param realTime Whether data should be updated in real time
 * @param startFetching Starts fetching only if set to true
 */
const useFirestoreDoc = <T>(
  query: ((db: firebase.firestore.Firestore) => Snapshot) | string,
  config: Config = {}
): [Data<T>, Actions] => {
  const [state, setState] = useState<Data<T>>({ loading: true })
  const [lastDoc, setLastDoc] = useState<T>()
  const [refreshObject, setRefreshObject] = useState({})
  const configMemo = JSON.stringify(config)

  const onNext = (
    snap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => {
    const data: any = { ...snap.data(), id: snap.id }

    if (snap.exists) {
      setState(x => ({ ...x, loading: false, error: undefined, data, fetching: false }))
      setLastDoc(data)
    } else
      setState(x => ({
        ...x,
        loading: false,
        error: { message: 'Data not found' } as FirestoreError,
      }))
  }

  const onError = (error: FirestoreError) =>
    setState(x => ({ ...x, loading: false, error }))

  const getRealTimeData = useCallback(
    () =>
      typeof query === 'function'
        ? query(projectFirestore).onSnapshot(onNext, onError)
        : projectFirestore.doc(query).onSnapshot(onNext, onError),
    [query]
  )

  const getData = useCallback(
    () =>
      typeof query === 'function'
        ? query(projectFirestore).get().then(onNext).catch(onError)
        : projectFirestore.doc(query).get().then(onNext).catch(onError),
    [query]
  )

  useEffect(() => {
    if (config.startFetching === false) return
    let unsub: Function = () => {}

    // to differ between fetching and loading
    // if lastDoc has value -> refresh actions was called -> fetching = true and loading:false
    // if lastDoc is undefined -> this is initial load -> fetching:false and laoding:true
    setState(x =>
      lastDoc
        ? {
            ...x,
            loading: false,
            error: undefined,
            fetching: true,
            data: lastDoc,
          }
        : { ...x, loading: true, error: undefined, fetching: false }
    )

    if (config.realTime === false) getData()
    else unsub = getRealTimeData()

    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRealTimeData, getData, configMemo, refreshObject]) // DO NOT INCLUDE lastDoc

  const actions = useMemo(
    () => ({
      refresh: config.realTime === false ? () => setRefreshObject({}) : () => {},
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configMemo]
  )

  return [state, actions]
}

export default useFirestoreDoc
