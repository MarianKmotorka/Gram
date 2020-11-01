import { motion } from 'framer-motion'
import styled from 'styled-components'
import { CenteredContainer } from '../../components/CenteredContainer'

export const Wrapper = styled(CenteredContainer)`
  height: 100%;
  position: relative;
  padding-top: 15px;

  > * + * {
    margin-top: 25px;
  }
`

export const DraggableWrapper = styled(motion.div)`
  position: fixed;
  bottom: 50px;
  right: 18%;
  z-index: 2;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.3);
  background-color: transparent;
  border-radius: 100vh;

  * + * {
    margin-left: 10px;
  }

  @media only screen and (max-width: 1250px) {
    right: 11%;
  }

  @media only screen and (max-width: 700px) {
    right: 7%;
  }
`
