import React from 'react'
import moment from 'moment'
import { ClockIcon, EditIcon } from '../../../components/Icons'
import noPhotoPng from '../../../images/no-photo.png'
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
  nick: string
  createdAt: Date
  aboutMe?: string
  photo?: string | null
}

const Profile: React.FC<IProfileProps> = ({ nick, aboutMe, createdAt, photo }) => {
  return (
    <Wrapper>
      <PhotoWrapper>
        <ProfilePhoto src={photo || noPhotoPng} />
        <EditPhotoButton buttonType='action' icon={<EditIcon />} />
      </PhotoWrapper>

      <Nick>{nick}</Nick>

      <AboutSection>
        {aboutMe && (
          <p>
            <BoldSpan>
              <EditIcon margin='0 3px 0 0' />
              About me:
            </BoldSpan>
            {aboutMe}
          </p>
        )}

        <p>
          <BoldSpan>
            <ClockIcon margin='0 3px 0 0' />
            Account created:
          </BoldSpan>
          {moment(createdAt).format('MMMM Do YYYY')}
        </p>
      </AboutSection>
    </Wrapper>
  )
}

export default Profile
