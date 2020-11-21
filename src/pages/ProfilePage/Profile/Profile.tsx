import React, { useState } from 'react'
import moment from 'moment'

import { IUser } from '../../../domain'
import useUploadNewPhoto from './useUploadNewPhoto'
import noPhotoPng from '../../../images/no-photo.png'
import { useFollowers } from '../../../contextProviders/FollowersProvider'
import { Button } from '../../../components'
import {
  ClockIcon,
  EditIcon,
  UserSecretIcon,
  BlindManIcon,
  EnvelopeIcon,
  PlusIcon,
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
} from './Profile.styled'

interface IProfileProps {
  user: IUser
  isCurrentUser: boolean
}

const Profile: React.FC<IProfileProps> = ({ user, isCurrentUser }) => {
  const [file, setFile] = useState<File | null>(null)
  const { uploading, progress, startUploading } = useUploadNewPhoto(
    file,
    user.id,
    user.photoUrl
  )

  const { followingsCount, handleFollowed, isFollowedByMe } = useFollowers()

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
          <Text>
            <Bold>
              <BlindManIcon />
              <span>Following:</span>
            </Bold>
            {followingsCount}
          </Text>
          <Text>
            <Bold>
              <UserSecretIcon />
              <span>Followed by:</span>
            </Bold>
            -
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
        </InfoCard>
      </AboutSection>
    </Wrapper>
  )
}

export default Profile
