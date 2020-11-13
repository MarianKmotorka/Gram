import React, { FC, useState } from 'react'
import { SearchIcon } from '../../../Icons'
import {
  SearchContainer,
  Search,
  Title,
  Wrapper,
  Row,
  RowsContainer,
} from './Likes.styled'

interface ILikesProps {
  likes: string[]
}

const Likes: FC<ILikesProps> = ({ likes }) => {
  const [filter, setFilter] = useState('')

  return (
    <Wrapper>
      <Title>
        {likes.length} {likes.length === 1 ? 'person' : 'people'} liked your post
      </Title>

      <SearchContainer>
        <SearchIcon />
        <Search
          placeholder='who liked my post'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </SearchContainer>

      <RowsContainer>
        {likes
          .filter(x => x.includes(filter))
          .map(x => (
            <Row key={x}>{x}</Row>
          ))}
      </RowsContainer>
    </Wrapper>
  )
}

export default Likes
