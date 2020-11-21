import styled from 'styled-components'
import Button from '../../../components/Button/Button'
import pattern from '../../../images/patternpad2.svg'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:first-of-type {
    background-image: url(${pattern});
    display: flex;
    flex-direction: column;
    align-items: center;
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
  background: ${({ theme }) => theme.primary};
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
  display: inline-block;
  text-align: center;

  font-size: 2em;
  font-weight: 500;

  padding: 5px 12px;
  margin-top: -7px;
  border-radius: 5px;

  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.white};

  :first-letter {
    color: ${({ theme }) => theme.accent2};
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

  i {
    width: 35px;
    text-align: center;
  }

  span {
    color: inherit;
  }
`

export const Text = styled.p`
  font-weight: 200;
  line-height: 25px;
  color: inherit;

  i {
    color: inherit;
    color: ${({ theme }) => theme.accent};
  }
`

export const InfoCard = styled.div`
  position: relative;
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
    border-radius: 5px;
  }
`
