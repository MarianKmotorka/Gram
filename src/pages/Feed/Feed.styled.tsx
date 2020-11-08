import styled from 'styled-components'
import { CenteredContainer } from '../../components/CenteredContainer'

export const Wrapper = styled(CenteredContainer)`
  display: flex;
  height: auto;
  gap: 22px;

  @media only screen and (max-width: 1000px) {
    justify-content: center;
  }
`
export const PostsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  > * {
    margin-top: 15px;
  }
`

export const BottomDiv = styled.div`
  height: 1px;
`

export const SideCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  height: 370px;
  min-width: 250px;
  width: 300px;
  overflow: hidden;

  position: sticky;
  top: 15px;

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

export const Nick = styled.h3`
  ::first-letter {
    color: ${({ theme }) => theme.green};
  }

  font-size: 1.3em;
  margin-top: -35px;
`

export const CardSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);

  margin: 25px 0 30px;
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
