import React, { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { IEntity } from '../../domain'
import MessageStripe from '../MessageStripe'
import { propertyOf } from '../../utils/utils'
import { LoadingIcon, SearchIcon } from '../Icons'
import { useFirestoreQuery, useDebounce, useOnClickOutside } from '../../hooks'

import { Wrapper, StyledInput, RowsContainer, Row } from './SearchInput.styled'

interface ISearchInputProps<T extends IEntity> {
  searchPrefix?: string
  collectionName?: string
  filterBy?: keyof T
  onSelected: (value: T) => void
  rowRenderer: (value: T) => JSX.Element
  getFirestoreQuery?: (
    searchText: string,
    query: firebase.firestore.Firestore
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>
}

const SearchInput = <T extends IEntity>({
  searchPrefix,
  collectionName,
  filterBy,
  getFirestoreQuery,
  rowRenderer,
  onSelected,
}: ISearchInputProps<T>) => {
  const [expanded, setExpanded] = useState(false)
  const [text, setTextInternal] = useState('')
  const debouncedText = useDebounce<string>(text, 400)

  const wrapperRef = useOnClickOutside<HTMLDivElement>(() => {
    setExpanded(false)
    setTextInternal('')
  })

  const getQuery = useCallback(
    (text: string, db: firebase.firestore.Firestore) => {
      if (getFirestoreQuery) return getFirestoreQuery(text, db)
      if (!collectionName || !filterBy)
        throw new Error(
          'You must provide collectionName with filterBy parameter or getFirestoreQuery parameter.'
        )

      return db
        .collection(collectionName)
        .where(`${propertyOf<T>(filterBy)}`, '>=', text)
        .limit(5)
    },
    [collectionName, filterBy, getFirestoreQuery]
  )

  const [values, loading, error] = useFirestoreQuery<T>(
    useCallback(db => getQuery(debouncedText, db), [getQuery, debouncedText]),
    expanded
  )

  const setText = (value: string) => {
    if (!searchPrefix) setTextInternal(value)
    else if (value.startsWith(searchPrefix)) setTextInternal(value)
    else setTextInternal(searchPrefix + value)
  }

  const handleSelected = (value: T) => {
    setExpanded(false)
    onSelected(value)
  }

  const filteredValues = filterBy
    ? values.filter(x =>
        `${x[filterBy]}`.toLowerCase().startsWith(debouncedText.toLowerCase())
      )
    : values

  return (
    <Wrapper ref={wrapperRef}>
      <SearchIcon />

      <StyledInput
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={() => setExpanded(true)}
        placeholder='Search...'
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
