import { useState, useEffect, useMemo, useCallback } from 'react'
import { projectFirestore } from '../firebase/firebaseConfig'

type Snapshot = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
type FirestoreError = firebase.firestore.FirestoreError
type Actions = { refresh: () => void }
type Config = { realTime?: boolean; startFetching?: boolean }
type Data<T> =
  | { loading: true }
  | { loading: false; error: FirestoreError }
  | { loading: false; error: undefined; data: T; fetching: boolean } // loading is TRUE only once, fetching is also TRUE when refreshing

/**
 * @param query Function that returns a document query - needs to be wrapped in useCallback |OR| string path to the document
 * @param realTime Whether data should be updated in real time
 * @param startFetching Starts fetching only if set to TRUE - default value is TRUE
 */
const useFirestoreDoc = <T>(
  query: ((db: firebase.firestore.Firestore) => Snapshot) | string,
  config: Config = {}
): [Data<T>, Actions] => {
  const [state, setState] = useState<Data<T>>({ loading: true })

  const onNext = (
    snap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => {
    const data: any = { ...snap.data(), id: snap.id }

    if (snap.exists) {
      setState(x => ({ ...x, loading: false, error: undefined, data, fetching: false }))
    } else
      setState(x => ({
        ...x,
        loading: false,
        error: { message: 'Data not found' } as FirestoreError,
      }))
  }

  const onError = (error: FirestoreError) =>
    setState(x => ({ ...x, loading: false, error, fetching: false }))

  const getRealTimeData = useCallback(
    () =>
      typeof query === 'function'
        ? query(projectFirestore).onSnapshot(onNext, onError)
        : projectFirestore.doc(query).onSnapshot(onNext, onError),
    [query]
  )

  const getData = useCallback(async () => {
    setState(x => ({ ...x, fetching: true }))

    typeof query === 'function'
      ? await query(projectFirestore).get().then(onNext).catch(onError)
      : await projectFirestore.doc(query).get().then(onNext).catch(onError)
  }, [query])

  useEffect(() => {
    if (config.startFetching === false) return
    let unsub: Function = () => {}

    setState(x => ({ ...x, loading: true, error: undefined }))

    if (config.realTime === false) getData()
    else unsub = getRealTimeData()

    return () => unsub()
  }, [getRealTimeData, getData, config.realTime, config.startFetching])

  const actions = useMemo(
    () => ({
      refresh: config.realTime === false ? getData : () => {},
    }),
    [getData, config.realTime]
  )

  return [state, actions]
}

export default useFirestoreDoc
