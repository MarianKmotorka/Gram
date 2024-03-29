import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import noPhoto from '../../../images/no-photo.png'
import FollowersDetail, {
  FollowersDetailTabs,
} from '../../ProfilePage/Profile/FollowersDetail/FollowersDetail'
import SideBlade from '../../../components/SideBlade/SideBlade'
import {
  BlindManIcon,
  CloseIcon,
  EnvelopeIcon,
  UserSecretIcon,
} from '../../../components/Icons'

import {
  Stat,
  CardSeparator,
  CardTop,
  Nick,
  ProfilePhoto,
  CardMiddle,
  Wrapper,
  StyledLoader,
} from './SideCard.styled'
import { useAuthorizedUser } from '../../../providers/AuthProvider'
import { useFollowers } from '../../../providers/FollowersProvider'

export const SideCardPlaceHolder = () => <Wrapper visibility='hidden' />

const SideCard: FC = () => {
  const [bladeSelectedTab, setBladeSelectedTab] = useState<FollowersDetailTabs>()
  const { currentUser } = useAuthorizedUser()
  const history = useHistory()
  const {
    followedByCount,
    followingsCount,
    followingsLoading,
    followedByLoading,
  } = useFollowers()

  return (
    <>
      <Wrapper>
        <CardTop />
        <CardMiddle>
          <ProfilePhoto
            src={currentUser.photoUrl || noPhoto}
            onClick={() => history.push(`/profile/${currentUser.id}`)}
          />
          <Nick>{currentUser.nick}</Nick>
        </CardMiddle>

        <CardSeparator />

        <Stat>
          <EnvelopeIcon />
          <b>Posts:</b>
          {currentUser.postCount}
        </Stat>
        <Stat clickable onClick={() => setBladeSelectedTab('following')}>
          <BlindManIcon />
          <b>Following:</b>
          {followingsLoading ? <StyledLoader /> : followingsCount}
        </Stat>
        <Stat clickable onClick={() => setBladeSelectedTab('followedBy')}>
          <UserSecretIcon />
          <b>Followed by:</b>
          {followedByLoading ? <StyledLoader /> : followedByCount}
        </Stat>
      </Wrapper>

      <AnimatePresence>
        {bladeSelectedTab && (
          <SideBlade
            onClose={() => setBladeSelectedTab(undefined)}
            closeIcon={<CloseIcon color='bg' />}
          >
            <FollowersDetail
              isCurrentUser
              userNick={currentUser.nick}
              selectedTab={bladeSelectedTab}
              onSelectedTabChanged={setBladeSelectedTab}
            />
          </SideBlade>
        )}
      </AnimatePresence>
    </>
  )
}

export default SideCard
