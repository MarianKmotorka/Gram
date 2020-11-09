import styled from 'styled-components'
import Button from '../../components/Button/Button'
import { CenteredContainer } from '../../components/CenteredContainer'
import pattern from '../../images/patternpad.svg'

export const Wrapper = styled(CenteredContainer)`
  display: flex;
  height: auto;

  > div:first-of-type {
    margin-right: 22px;
  }

  @media only screen and (max-width: 1000px) {
    justify-content: center;
  }
`
export const PostsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  > div + div {
    margin-top: 15px;
  }
`

export const DummymSpan = styled.span`
  height: 1px;
  display: inline-block;
`

export const SideCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  height: 370px;
  min-width: 250px;
  width: 300px;
  overflow: hidden;

  position: sticky;
  top: 25px;
  margin-top: 25px;

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 1000px) {
    display: none;
  }
`

export const ProfilePhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  top: -50px;
  border: 3px solid ${({ theme }) => theme.white};
  cursor: pointer;
`

export const CardTop = styled.div`
  height: 75px;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
`

export const CardMiddle = styled.div`
  background-image: url(${pattern});
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
`

export const Nick = styled.h3`
  ::first-letter {
    color: ${({ theme }) => theme.green};
  }

  font-size: 1.6em;
  font-weight: 500;
  margin-top: -35px;
`

export const CardSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);

  margin-bottom: 30px;
`

export const Stat = styled.p`
  font-weight: 200;
  b {
    font-weight: 500;
    color: ${({ theme }) => theme.accent};
    margin-right: 10px;
  }
  margin: 8px auto 0 40px;
`

export const ScrollUpButton = styled(Button)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 20px;
  right: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`
