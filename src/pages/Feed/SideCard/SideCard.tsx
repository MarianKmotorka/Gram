import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { IUser } from '../../../domain'
import noPhoto from '../../../images/no-photo.png'
import { BlindManIcon, EnvelopeIcon, UserSecretIcon } from '../../../components/Icons'
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
  return (
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
      <Stat>
        <BlindManIcon />
        <b>Following:</b>
        {followingCount}
      </Stat>
      <Stat>
        <UserSecretIcon />
        <b>Followed by:</b>
        {followedByCount}
      </Stat>
    </Wrapper>
  )
}

export default SideCard
