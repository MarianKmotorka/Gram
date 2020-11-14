import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CenteredContainer } from '../CenteredContainer'

export const Wrapper = styled.div`
  background: #222222;
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

export const GithubLink = styled(motion.a)`
  i {
    font-size: 3em;
    color: ${({ theme }) => theme.accent};
  }

  :hover i {
    color: ${({ theme }) => theme.bg};
  }
`
