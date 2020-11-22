import { motion } from 'framer-motion'
import styled from 'styled-components'
import { NAVBAR_HEIGHT_PX } from '../Navbar/Navbar.styled'

export const Wrapper = styled(motion.section)`
  position: fixed;
  right: 0;
  height: calc(100vh - ${NAVBAR_HEIGHT_PX});
  top: ${NAVBAR_HEIGHT_PX};
  max-width: 550px;
  width: 100vw;
  background: ${({ theme }) => theme.bg};
  z-index: 5;
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.3);
`
