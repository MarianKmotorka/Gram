import React, { useCallback, useState } from 'react'
import { SearchIcon } from '../Icons'
import { IEntity } from '../../domain'
import useFirestoreQuery from '../../hooks/useFirestoreQuery'

import { Wrapper, StyledInput, RowsContainer } from './SearchInput.styled'
import useOnClickOutside from '../../hooks/useOnClickOutside'

interface ISearchInputProps<T extends IEntity> {
  searchPrefix?: string
  onSelected: (value: T) => void
  rowRenderer: (value: T) => JSX.Element
  getFirestoreQuery: (
    searchText: string,
    query: firebase.firestore.Firestore
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>
}

const SearchInput = <T extends IEntity>({
  searchPrefix,
  getFirestoreQuery,
  rowRenderer,
  onSelected,
}: ISearchInputProps<T>) => {
  const [text, setTextInternal] = useState('')
  const [expanded, setExpanded] = useState(false)
  const wrapperRef = useOnClickOutside<HTMLDivElement>(() => setExpanded(false))
  const [values, loading] = useFirestoreQuery<T>(
    useCallback(db => getFirestoreQuery(text, db), [getFirestoreQuery, text]),
    !!text && expanded
  )

  const setText = (value: string) => {
    if (!searchPrefix) setTextInternal(value)
    else if (value.startsWith(searchPrefix)) setTextInternal(value)
    else setTextInternal(searchPrefix + value)
  }

  return (
    <Wrapper ref={wrapperRef}>
      <SearchIcon />
      <StyledInput
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={() => setExpanded(true)}
        placeholder='Search...'
      ></StyledInput>

      {expanded && (
        <RowsContainer>
          {loading && <p>...Loading</p>}

          {!loading &&
            values.map(x => (
              <div key={x.id} onClick={() => onSelected(x)}>
                {rowRenderer(x)}
              </div>
            ))}
        </RowsContainer>
      )}
    </Wrapper>
  )
}

export default SearchInput
