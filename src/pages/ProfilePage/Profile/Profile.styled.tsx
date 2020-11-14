import styled from 'styled-components'
import Button from '../../../components/Button/Button'
import pattern from '../../../images/patternpad2.svg'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:first-of-type {
    background-image: url(${pattern});
  }

  > * {
    margin-top: 15px;
  }
`

export const PhotoWrapper = styled.div`
  height: 205px;
  width: 205px;
  padding: 3px;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.green} , ${theme.primary})`};
`

export const ProfilePhoto = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
`

export const EditPhotoButton = styled(Button)`
  position: absolute;
  top: 82%;
  left: 82%;
`

export const Nick = styled.p`
  font-size: 2em;
  text-align: center;
  font-weight: bolder;
  :first-letter {
    color: ${({ theme }) => theme.green};
  }
`

export const AboutSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;

  > * + * {
    margin-left: 15px;

    @media only screen and (max-width: 900px) {
      margin-left: 0;
      margin-top: 15px;
    }
  }

  > div:first-of-type {
    flex: 2;
  }

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`

export const Bold = styled.b`
  font-weight: 400;
  margin-right: 10px;
  color: ${({ theme }) => theme.accent};

  i {
    width: 30px;
    text-align: center;
  }

  span {
    color: inherit;
  }
`

export const Text = styled.p`
  font-weight: 200;
  line-height: 20px;
  color: inherit;

  i {
    color: inherit;
  }
`

export const InfoCard = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
  min-width: 360px;
  min-height: 150px;
  width: 100%;
  flex: 1;

  > * + * {
    margin-top: 15px;
  }

  @media only screen and (max-width: 400px) {
    min-width: 200px;
  }
`
