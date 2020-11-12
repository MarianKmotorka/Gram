import { useCallback, useEffect, useState } from 'react'

import { IEntity } from '../domain'
import useFirestoreQuery from './useFirestoreQuery'

type Result<T> = [
  T[],
  boolean,
  () => void,
  boolean,
  () => void,
  firebase.firestore.FirestoreError | undefined,
  (modifiedDoc: T) => void
]

/**
 * @param getQuery Function that returns a query, that will be run against firebase - must be ordered and wrapped in useCallback
 * @returns [documents, isLoading, loadMore(), hasMore, refresh(), error, modifyDoc(doc:T)]
 */
const usePagedQuery = <T extends IEntity>(
  getQuery: (
    query: firebase.firestore.Firestore
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>,
  pageSize: number = 5
): Result<T> => {
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

  const modifyDoc = (modifiedDoc: T) => {
    setDocs(prev =>
      prev.map(x => {
        if (x.id === modifiedDoc.id) return { ...modifiedDoc }
        else return x
      })
    )
  }

  return [docs, loading, nextPage, hasMore, resetState, error, modifyDoc]
}

export default usePagedQuery
