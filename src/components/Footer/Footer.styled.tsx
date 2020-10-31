import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CenteredContainer } from '../CenteredContainer'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.blackLight};
  width: 100%;
`

export const Centered = styled(CenteredContainer)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  padding: 30px 15px;
  gap: 20px;
  min-height: 200px;
`

export const Logo = styled(motion.div)`
  color: ${({ theme }) => theme.black};
  font-size: 22px;
  font-weight: 500;
  background: ${({ theme }) => theme.bg};

  cursor: pointer;
  height: 70px;
  padding: 20px 30px;
  border-radius: 15px;

  ::first-letter {
    color: ${({ theme }) => theme.redLight};
  }
`

export const Copyright = styled(motion.p)`
  color: ${({ theme }) => theme.bg};
  font-size: 22px;
  background: ${({ theme }) => theme.blackLight};

  height: 70px;
  padding: 20px 30px;
  border-radius: 15px;
  cursor: pointer;

  ::first-letter {
    color: ${({ theme }) => theme.redLight};
  }
`

export const GithubLink = styled(motion.a)`
  i {
    font-size: 3em;
    color: ${({ theme }) => theme.bg};
  }

  :hover i {
    color: ${({ theme }) => theme.blackLight};
  }
`
