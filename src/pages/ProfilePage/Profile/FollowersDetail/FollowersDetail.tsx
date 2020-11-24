import React, { FC, useState } from 'react'

import { Button, TabView } from '../../../../components'
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
  NickLink,
} from './FollowersDetail.styled'

interface IFollowersDetailProps {
  isCurrentUser: boolean
  userNick: string
  selectedTab: FollowersDetailTabs
  onSelectedTabChanged: (tabName: FollowersDetailTabs) => void
}

export type FollowersDetailTabs = 'following' | 'followedBy'

const FollowersDetail: FC<IFollowersDetailProps> = ({
  isCurrentUser,
  userNick,
  selectedTab,
  onSelectedTabChanged,
}) => {
  const { followings, followedBy, handleFollowed, isFollowedByMe } = useFollowers()
  const [followingFilter, setFollowingFilter] = useState('')
  const [followedByFilter, setFollowedByFilter] = useState('')

  const filteredFollowings = followings.filter(x => x.userNick.includes(followingFilter))
  const filteredFollowedBy = followedBy.filter(x => x.userNick.includes(followedByFilter))

  return (
    <Wrapper>
      <TabView.Container selectedKey={selectedTab} onChange={onSelectedTabChanged}>
        <TabView.Item<FollowersDetailTabs> tabKey='following' name='Following'>
          <Title>{getFollowingText(isCurrentUser, followings.length, userNick)}</Title>

          <SearchContainer>
            <SearchIcon />
            <Search
              placeholder={
                isCurrentUser ? 'who am I following' : `who is ${userNick} following`
              }
              value={followingFilter}
              onChange={e => setFollowingFilter(e.target.value)}
            />
          </SearchContainer>

          <RowsContainer>
            {filteredFollowings.map(x => (
              <Row key={x.userId}>
                <NickLink to={`/profile/${x.userId}`}>{x.userNick}</NickLink>
                {isCurrentUser && (
                  <Button
                    scale={0.8}
                    onClick={async () => handleFollowed(x.userId, x.userNick)}
                  >
                    Unfollow
                  </Button>
                )}
              </Row>
            ))}
          </RowsContainer>
        </TabView.Item>

        <TabView.Item<FollowersDetailTabs> tabKey='followedBy' name='Followed by'>
          <Title>{getFollowedByText(isCurrentUser, followedBy.length, userNick)}</Title>

          <SearchContainer>
            <SearchIcon />
            <Search
              placeholder={isCurrentUser ? 'who follows me' : `who follows ${userNick}`}
              value={followedByFilter}
              onChange={e => setFollowedByFilter(e.target.value)}
            />
          </SearchContainer>

          <RowsContainer>
            {filteredFollowedBy.map(x => (
              <Row key={x.userId}>
                <NickLink to={`/profile/${x.userId}`}>{x.userNick}</NickLink>
                {isCurrentUser && (
                  <Button
                    scale={0.8}
                    onClick={async () => handleFollowed(x.userId, x.userNick)}
                  >
                    {isFollowedByMe(x.userId) ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
              </Row>
            ))}
          </RowsContainer>
        </TabView.Item>
      </TabView.Container>
    </Wrapper>
  )
}

export default FollowersDetail
