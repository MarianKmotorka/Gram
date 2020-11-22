import React, { FC, useState } from 'react'

import { TabView } from '../../../../components'
import { SearchIcon } from '../../../../components/Icons'
import { getFollowedByText, getFollowingText } from './utils'
import { useFollowers } from '../../../../contextProviders/FollowersProvider'

import {
  Row,
  RowsContainer,
  Search,
  SearchContainer,
  Wrapper,
  Title,
} from './FollowersDetail.styled'

interface IFollowersDetailProps {
  isCurrentUser: boolean
  userNick: string
  defaultTabName?: string
}

export const tabNames = {
  following: 'Following',
  followedBy: 'Followed by',
}

const FollowersDetail: FC<IFollowersDetailProps> = ({
  isCurrentUser,
  userNick,
  defaultTabName,
}) => {
  const { followings, followedBy } = useFollowers()
  const [followingFilter, setFollowingFilter] = useState('')
  const [followedByFilter, setFollowedByFilter] = useState('')

  const filteredFollowings = followings.filter(x => x.userNick.includes(followingFilter))
  const filteredFollowedBy = followedBy.filter(x => x.userNick.includes(followedByFilter))

  return (
    <Wrapper>
      <TabView.Container defaultTabName={defaultTabName}>
        <TabView.Item name={tabNames.following}>
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

        <TabView.Item name={tabNames.followedBy}>
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
