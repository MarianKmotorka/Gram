import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { IUser } from '../../../domain'
import noPhoto from '../../../images/no-photo.png'
import FollowersDetail, {
  tabNames,
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
} from './SideCard.styled'

interface ISideCardProps {
  currentUser: IUser
  followingCount: number
  followedByCount: number
}

export const SideCardPlaceHolder = () => <Wrapper visibility='hidden' />

const SideCard: FC<ISideCardProps> = ({
  currentUser,
  followingCount,
  followedByCount,
}) => {
  const history = useHistory()
  const [bladeSelectedTab, setBladeSelectedTab] = useState<string>()

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
        <Stat clickable onClick={() => setBladeSelectedTab(tabNames.following)}>
          <BlindManIcon />
          <b>Following:</b>
          {followingCount}
        </Stat>
        <Stat clickable onClick={() => setBladeSelectedTab(tabNames.followedBy)}>
          <UserSecretIcon />
          <b>Followed by:</b>
          {followedByCount}
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
              selectedTabName={bladeSelectedTab}
              onSelectedTabNameChange={setBladeSelectedTab}
            />
          </SideBlade>
        )}
      </AnimatePresence>
    </>
  )
}

export default SideCard
