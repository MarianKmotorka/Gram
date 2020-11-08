import React, { useState } from 'react'
import moment from 'moment'
import { IUser } from '../../../domain'
import useUploadNewPhoto from './useUploadNewPhoto'
import noPhotoPng from '../../../images/no-photo.png'
import {
  ClockIcon,
  EditIcon,
  UserSecretIcon,
  BlindManIcon,
  EnvelopeIcon,
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

      <AboutSection>
        <InfoCard>
          <p>
            <Bold>
              <EditIcon />
              <span>About me:</span>
            </Bold>
            {user.aboutMe}
          </p>
        </InfoCard>

        <InfoCard>
          <p>
            <Bold>
              <EnvelopeIcon />
              <span>Posts:</span>
            </Bold>
            {user.postCount}
          </p>
          <p>
            <Bold>
              <BlindManIcon />
              <span>Following:</span>
            </Bold>
            {0}
          </p>
          <p>
            <Bold>
              <UserSecretIcon />
              <span>Followed by:</span>
            </Bold>
            {0}
          </p>
          <p>
            <Bold>
              <ClockIcon />
              <span>Account created:</span>
            </Bold>
            {moment(user.createdAt.toDate()).format('MMMM Do YYYY')}
          </p>
        </InfoCard>
      </AboutSection>
    </Wrapper>
  )
}

export default Profile
