import { useCallback, useEffect, useState } from 'react'

import { IEntity } from '../domain'
import useFirestoreQuery from './useFirestoreQuery'

/**
 *
 * @param getQuery Function that returns a query, that will be run against firebase - must be ordered and wrapped in useCallback
 */
const usePagedQuery = <T extends IEntity>(
  getQuery: (
    query: firebase.firestore.Firestore
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>,
  pageSize: number = 5
): [
  T[],
  boolean,
  () => void,
  boolean,
  () => void,
  firebase.firestore.FirestoreError | undefined
] => {
  const [hasMore, setHasMore] = useState(false)
  const [docs, setDocs] = useState<Array<T>>([])
  const [getQueryPaged, setGetQueryPaged] = useState<typeof getQuery>(undefined!)

  const [docsPage, loading, error, firebaseDocsPage] = useFirestoreQuery<T>(
    getQueryPaged,
    !!getQueryPaged
  )

  const nextPage = () => {
    if (!hasMore) return

    setGetQueryPaged(() => (db: firebase.firestore.Firestore) =>
      getQuery(db)
        .startAfter(firebaseDocsPage[firebaseDocsPage.length - 1])
        .limit(pageSize)
    )
  }

  const resetState = useCallback(() => {
    setDocs([])
    setHasMore(false)
    setGetQueryPaged(() => (db: firebase.firestore.Firestore) =>
      getQuery(db).limit(pageSize)
    )
  }, [getQuery, pageSize])

  useEffect(() => {
    setDocs(prev => [...prev, ...docsPage])
    setHasMore(docsPage.length === pageSize)
  }, [docsPage, pageSize])

  useEffect(() => resetState(), [resetState])

  const refresh = () => resetState()

  return [docs, loading, nextPage, hasMore, refresh, error]
}

export default usePagedQuery
