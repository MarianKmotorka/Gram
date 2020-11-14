import React, { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { IEntity } from '../../../domain'
import MessageStripe from '../../MessageStripe'
import { propertyOf } from '../../../utils/utils'
import { LoadingIcon, SearchIcon } from '../../Icons'
import {
  useDebounce,
  useNotifyError,
  useOnClickOutside,
  useFirestoreQuery,
} from '../../../hooks'

import { Wrapper, StyledInput, RowsContainer, Row } from './SearchInput.styled'

export interface ISearchInputProps<T extends IEntity> {
  searchPrefix?: string
  onFocus?: () => void
  onBlur?: () => void
  onSelected: (value: T) => void
  rowRenderer: (value: T) => JSX.Element
  query:
    | ((
        searchText: string,
        db: firebase.firestore.Firestore
      ) => firebase.firestore.Query<firebase.firestore.DocumentData>)
    | { collectionName: string; filterBy: keyof T }
}

const SearchInput = <T extends IEntity>({
  searchPrefix,
  onBlur,
  onFocus,
  onSelected,
  rowRenderer,
  query,
}: ISearchInputProps<T>) => {
  const [expanded, setExpanded] = useState(false)
  const [text, setTextInternal] = useState('')
  const debouncedText = useDebounce<string>(text, 400)

  const wrapperRef = useOnClickOutside<HTMLDivElement>(() => {
    setExpanded(false)
    setTextInternal('')
    onBlur && onBlur()
  })

  const getQuery = useCallback(
    (text: string, db: firebase.firestore.Firestore) => {
      if (typeof query === 'function') return query(text, db)

      return db
        .collection(query.collectionName)
        .where(`${propertyOf<T>(query.filterBy)}`, '>=', text)
        .limit(10)
    },
    [query]
  )

  const [values, loading, error] = useFirestoreQuery<T>(
    useCallback(db => getQuery(debouncedText, db), [getQuery, debouncedText]),
    { startFetching: expanded }
  )

  useNotifyError(error)

  const setText = (value: string) => {
    if (!searchPrefix) setTextInternal(value)
    else if (value.startsWith(searchPrefix)) setTextInternal(value)
    else setTextInternal(searchPrefix + value)
  }

  const handleSelected = (value: T) => {
    setExpanded(false)
    onSelected(value)
  }

  const handleFocused = () => {
    setExpanded(true)
    onFocus && onFocus()
  }

  const filteredValues =
    typeof query === 'object' && query.filterBy
      ? values.filter(x =>
          `${x[query.filterBy]}`.toLowerCase().startsWith(debouncedText.toLowerCase())
        )
      : values

  return (
    <Wrapper ref={wrapperRef}>
      <SearchIcon />

      <StyledInput
        value={text}
        placeholder='Search...'
        onFocus={handleFocused}
        onChange={e => setText(e.target.value)}
      ></StyledInput>

      <AnimatePresence>
        {expanded && (
          <RowsContainer
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, transition: { type: 'tween' } }}
          >
            {loading && (
              <Row>
                <LoadingIcon />
              </Row>
            )}

            {error && (
              <Row fontSize={13}>
                <MessageStripe textType='error' text={error.message} />
              </Row>
            )}

            {!loading && filteredValues.length === 0 && (
              <Row fontSize={13}>No items found.</Row>
            )}

            {!loading &&
              filteredValues.map(x => (
                <Row key={x.id} onClick={() => handleSelected(x)}>
                  {rowRenderer(x)}
                </Row>
              ))}
          </RowsContainer>
        )}
      </AnimatePresence>
    </Wrapper>
  )
}

export default SearchInput
