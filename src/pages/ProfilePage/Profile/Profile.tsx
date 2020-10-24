import React from 'react'
import moment from 'moment'
import { ClockIcon, EditIcon } from '../../../components/Icons'
import noPhotoPng from '../../../images/no-photo.png'
import { ProfilePhoto, Wrapper, Nick, BoldSpan, AboutSection } from './Profile.styled'

interface IProfileProps {
  nick: string
  createdAt: Date
  description?: string
  photo?: string | null
}

const Profile: React.FC<IProfileProps> = ({ nick, description, createdAt, photo }) => {
  return (
    <Wrapper>
      <ProfilePhoto src={photo || noPhotoPng} />
      <Nick>{nick}</Nick>

      <AboutSection>
        {description && (
          <p>
            <BoldSpan>
              <EditIcon margin='0 3px 0 0' />
              About me:
            </BoldSpan>
            {description}
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
