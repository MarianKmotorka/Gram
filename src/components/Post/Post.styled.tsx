import { motion } from 'framer-motion'
import styled from 'styled-components'
import { lightenColor } from '../../utils/utils'

export const Wrapper = styled(motion.div)`
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  background-color: ${({ theme }) => theme.bg};
  max-height: 95vh;
  overflow: auto;
`

export const Header = styled.header`
  border-radius: 25px 25px 0 0;
  padding: 15px 25px;
  position: relative;
  p {
    font-size: 15px;
    font-weight: 200;
  }
  button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`

export const Image = styled.img`
  max-height: 70vh;
  max-width: 100vw;
`

export const ActionBar = styled.footer`
  border-radius: 0 0 25px 25px;
  padding: 8px 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Description = styled(motion.p)<{ width: number }>`
  font-weight: 300;
  padding: 15px 25px;
  max-width: ${({ width }) => width + 'px'};
  background: ${({ theme }) => lightenColor(theme.green, 0.3)};
`

export const ShowMore = styled.p`
  text-decoration: underline;
  overflow: hidden;
  cursor: pointer;
  :hover {
    font-weight: 400;
  }

  ::after {
    content: ' ->';
  }
`

export const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  > * + * {
    margin-left: 7px;
  }
`

export const AuthorPicture = styled.img`
  height: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.green};
`

export const AuthorNick = styled.p`
  font-weight: 700;
  :first-letter {
    color: ${({ theme }) => theme.green};
  }
`

export const CreatedAt = styled.p`
  i {
    margin-right: 5px;
  }
`
