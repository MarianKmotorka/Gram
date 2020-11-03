import { useEffect, useState } from 'react'
import useFirestoreQuery from './useFirestoreQuery'

/**
 *
 * @param getQuery Function that returns a query, that will be run against firebase - must be ordered and wrapped in useCallback
 */
const usePagedQuery = <T>(
  getQuery: (
    query: firebase.firestore.Firestore
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>,
  pageSize: number = 5
): [T[], boolean, () => void, boolean, firebase.firestore.FirestoreError | undefined] => {
  const [hasMore, setHasMore] = useState(false)
  const [docs, setDocs] = useState<Array<T>>([])

  const [
    getQueryPaged,
    setGetQueryPaged,
  ] = useState(() => (db: firebase.firestore.Firestore) => getQuery(db).limit(pageSize))

  const [docsPage, loading, error, firebaseDocsPage] = useFirestoreQuery<T>(getQueryPaged)

  const nextPage = () => {
    if (!hasMore) return

    setGetQueryPaged(() => (db: firebase.firestore.Firestore) =>
      getQuery(db)
        .startAfter(firebaseDocsPage[firebaseDocsPage.length - 1])
        .limit(pageSize)
    )
  }

  useEffect(() => {
    setDocs(prev => [...prev, ...docsPage])
    setHasMore(docsPage.length >= pageSize)
  }, [docsPage, pageSize])

  useEffect(() => {
    setDocs([])
    setHasMore(false)
    setGetQueryPaged(() => (db: firebase.firestore.Firestore) =>
      getQuery(db).limit(pageSize)
    )
  }, [getQuery, pageSize])

  return [docs, loading, nextPage, hasMore, error]
}

export default usePagedQuery
