import React, { FC, useState } from 'react'
import { TabView } from '../../../../components'
import { SearchIcon } from '../../../../components/Icons'
import { useFollowers } from '../../../../contextProviders/FollowersProvider'

import {
  Row,
  RowsContainer,
  Search,
  SearchContainer,
  Wrapper,
  Title,
} from './FollowersDetail.styled'
import { getFollowedByText, getFollowingText } from './utils'

interface IFollowersDetailProps {
  isCurrentUser: boolean
  userNick: string
}

const FollowersDetail: FC<IFollowersDetailProps> = ({ isCurrentUser, userNick }) => {
  const { followings, followedBy } = useFollowers()
  const [followingFilter, setFollowingFilter] = useState('')
  const [followedByFilter, setFollowedByFilter] = useState('')

  const filteredFollowings = followings.filter(x => x.userNick.includes(followingFilter))
  const filteredFollowedBy = followedBy.filter(x => x.userNick.includes(followedByFilter))

  return (
    <Wrapper>
      <TabView.Container>
        <TabView.Item name='Following'>
          <Title>{getFollowingText(isCurrentUser, followings.length, userNick)}</Title>

          <SearchContainer>
            <SearchIcon />
            <Search
              placeholder='who am I following'
              value={followingFilter}
              onChange={e => setFollowingFilter(e.target.value)}
            />
          </SearchContainer>

          <RowsContainer>
            {filteredFollowings.map(x => (
              <Row key={x.userId} to={`/profile/${x.userId}`}>
                {x.userNick}
              </Row>
            ))}
          </RowsContainer>
        </TabView.Item>

        <TabView.Item name='Followed by'>
          <Title>{getFollowedByText(isCurrentUser, followedBy.length, userNick)}</Title>

          <SearchContainer>
            <SearchIcon />
            <Search
              placeholder='who follows me'
              value={followedByFilter}
              onChange={e => setFollowedByFilter(e.target.value)}
            />
          </SearchContainer>

          <RowsContainer>
            {filteredFollowedBy.map(x => (
              <Row key={x.userId} to={`/profile/${x.userId}`}>
                {x.userNick}
              </Row>
            ))}
          </RowsContainer>
        </TabView.Item>
      </TabView.Container>
    </Wrapper>
  )
}

export default FollowersDetail
