import styled from 'styled-components'
import Button from '../../../components/Button/Button'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-top: 20px;
  }
`

export const PhotoWrapper = styled.div`
  height: 205px;
  width: 205px;
  padding: 3px;
  border-radius: 50%;
  position: relative;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.green} , ${theme.grayBlue})`};
`

export const ProfilePhoto = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: solid 5px ${({ theme }) => theme.bg};
`

export const EditPhotoButton = styled(Button)`
  position: absolute;
  top: 82%;
  left: 82%;
`

export const Nick = styled.p`
  font-weight: 400;
  font-size: 2em;
  :first-letter {
    color: ${({ theme }) => theme.green};
  }
`

export const AboutSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 15px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.blueGreenGradient};

  p {
    font-weight: 200;
    color: inherit;
  }

  i {
    color: inherit;
  }

  > * + * {
    margin-top: 15px;
  }
`

export const BoldSpan = styled.span`
  font-weight: 400;
  margin-right: 10px;
  color: ${({ theme }) => theme.redLight};
`
