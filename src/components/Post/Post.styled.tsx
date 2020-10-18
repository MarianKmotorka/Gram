import { motion } from 'framer-motion'
import styled from 'styled-components'

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