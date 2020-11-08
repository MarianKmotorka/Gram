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
    `linear-gradient(180deg, ${theme.green} , ${theme.primary})`};
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
  justify-content: space-around;
  padding: 15px;
  border-radius: 15px;
  flex-wrap: wrap;
  gap: 20px;

  p {
    font-weight: 200;
    color: inherit;
  }

  i {
    color: inherit;
  }
`

export const Bold = styled.b`
  font-weight: 400;
  margin-right: 10px;
  color: ${({ theme }) => theme.accent};

  i {
    width: 23px;
  }

  span {
    color: inherit;
  }
`

export const InfoCard = styled.div`
  border-radius: 20px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
  min-width: 360px;
  min-height: 150px;
  max-width: 600px;
  flex: 1;

  > * + * {
    margin-top: 15px;
  }

  @media only screen and (max-width: 400px) {
    min-width: 200px;
  }
`
