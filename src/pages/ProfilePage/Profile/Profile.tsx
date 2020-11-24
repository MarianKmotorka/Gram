import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'

import { IUser } from '../../../domain'
import { Button } from '../../../components'
import useUploadNewPhoto from './useUploadNewPhoto'
import noPhotoPng from '../../../images/no-photo.png'
import SideBlade from '../../../components/SideBlade/SideBlade'
import FollowersDetail, { tabNames } from './FollowersDetail/FollowersDetail'
import { useFollowers } from '../../../contextProviders/FollowersProvider'
import {
  ClockIcon,
  EditIcon,
  UserSecretIcon,
  BlindManIcon,
  EnvelopeIcon,
  PlusIcon,
  ExpandIcon,
  CloseIcon,
} from '../../../components/Icons'

import {
  ProfilePhoto,
  Wrapper,
  Nick,
  Bold,
  AboutSection,
  PhotoWrapper,
  EditPhotoButton,
  InfoCard,
  Text,
  StyledIconButton,
} from './Profile.styled'

interface IProfileProps {
  user: IUser
  isCurrentUser: boolean
}

const Profile: React.FC<IProfileProps> = ({ user, isCurrentUser }) => {
  const [bladeSelectedTab, setBladeSelectedTab] = useState<string>()
  const [file, setFile] = useState<File | null>(null)
  const { uploading, progress, startUploading } = useUploadNewPhoto(
    file,
    user.id,
    user.photoUrl
  )

  const {
    followedByCount,
    followingsCount,
    handleFollowed,
    isFollowedByMe,
  } = useFollowers()

  const handleEditPhotoClicked = () => {
    document.getElementById('upload-profile-photo-file-input')?.click()
  }

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      startUploading()
    }
  }

  return (
    <>
      <AnimatePresence>
        {bladeSelectedTab && (
          <SideBlade
            onClose={() => setBladeSelectedTab(undefined)}
            closeIcon={<CloseIcon color='bg' />}
          >
            <FollowersDetail
              isCurrentUser={isCurrentUser}
              userNick={user.nick}
              selectedTabName={bladeSelectedTab}
              onSelectedTabNameChange={setBladeSelectedTab}
            />
          </SideBlade>
        )}
      </AnimatePresence>

      <Wrapper>
        <input
          style={{ display: 'none' }}
          type='file'
          id='upload-profile-photo-file-input'
          onChange={handleInputChanged}
        />
        <InfoCard>
          <PhotoWrapper>
            <ProfilePhoto src={user.photoUrl || noPhotoPng} />

            {isCurrentUser && (
              <EditPhotoButton
                buttonType='action'
                icon={<EditIcon />}
                isLoading={uploading}
                loadingProgress={progress}
                onClick={handleEditPhotoClicked}
              />
            )}
          </PhotoWrapper>

          <Nick>{user.nick}</Nick>

          {!isCurrentUser && (
            <Button
              reversed={isFollowedByMe(user.id)}
              color='accent'
              onClick={async () => await handleFollowed(user.id, user.nick)}
            >
              {isFollowedByMe(user.id) ? 'Followed' : 'Follow'}
            </Button>
          )}
        </InfoCard>

        <AboutSection>
          <InfoCard>
            <Text>
              <Bold>
                <EditIcon />
                <span>About me:</span>
              </Bold>
              {user.aboutMe}
            </Text>
          </InfoCard>

          <InfoCard>
            <Text>
              <Bold>
                <EnvelopeIcon />
                <span>Posts:</span>
              </Bold>
              {user.postCount}
            </Text>
            <Text clickable onClick={() => setBladeSelectedTab(tabNames.following)}>
              <Bold>
                <BlindManIcon />
                <span>Following:</span>
              </Bold>
              {followingsCount}
            </Text>
            <Text clickable onClick={() => setBladeSelectedTab(tabNames.followedBy)}>
              <Bold>
                <UserSecretIcon />
                <span>Followed by:</span>
              </Bold>
              {followedByCount}
            </Text>
            <Text>
              <Bold>
                <PlusIcon />
                <span>Registered:</span>
              </Bold>
              {moment(user.createdAt.toDate()).format('DD. MM. YYYY')}
            </Text>
            {user.lastLogin && (
              <Text>
                <Bold>
                  <ClockIcon />
                  <span>Last login:</span>
                </Bold>
                {moment(user.lastLogin.toDate()).format('DD. MM. YYYY, HH:mm')}
              </Text>
            )}

            <StyledIconButton
              onClick={() => setBladeSelectedTab(tabNames.following)}
              top='-7px'
              right='7px'
              icon={<ExpandIcon />}
            />
          </InfoCard>
        </AboutSection>
      </Wrapper>
    </>
  )
}

export default Profile
