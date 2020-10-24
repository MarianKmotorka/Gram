import styled from 'styled-components'
import { lightenColor } from '../../../utils/utils'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-top: 20px;
  }
`

export const ProfilePhoto = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: solid 3px ${({ theme }) => theme.green};
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
  background-color: ${({ theme }) => lightenColor(theme.green, 0.1)};
  p {
    font-weight: 300;
  }

  > * + * {
    margin-top: 15px;
  }
`

export const BoldSpan = styled.span`
  font-weight: 500;
  margin-right: 10px;
`
