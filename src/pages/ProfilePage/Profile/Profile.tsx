import React, { useState } from 'react'
import moment from 'moment'
import { IUser } from '../../../domain'
import useUploadNewPhoto from './useUploadNewPhoto'
import noPhotoPng from '../../../images/no-photo.png'
import { ClockIcon, EditIcon } from '../../../components/Icons'

import {
  ProfilePhoto,
  Wrapper,
  Nick,
  BoldSpan,
  AboutSection,
  PhotoWrapper,
  EditPhotoButton,
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
        {user.aboutMe && (
          <p>
            <BoldSpan>
              <EditIcon margin='0 3px 0 0' />
              About me:
            </BoldSpan>
            {user.aboutMe}
          </p>
        )}

        <p>
          <BoldSpan>
            <ClockIcon margin='0 3px 0 0' />
            Account created:
          </BoldSpan>
          {moment(user.createdAt.toDate()).format('MMMM Do YYYY')}
        </p>
      </AboutSection>
    </Wrapper>
  )
}

export default Profile
