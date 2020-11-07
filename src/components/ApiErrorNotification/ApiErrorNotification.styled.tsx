import { motion } from 'framer-motion'
import styled from 'styled-components'
import { lightenColor } from '../../utils/utils'

export const Wrapper = styled(motion.div)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999999999999999;

  display: flex;
  flex-direction: column;
  padding: 10px 20px;

  min-height: 75px;
  max-width: 500px;
  width: calc(100% - 20px);

  background-color: ${({ theme }) => lightenColor(theme.white, 0.97)};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  font-weight: 300;
  border-radius: 5px;

  i {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
`

export const Title = styled.h3`
  margin-right: auto;
  font-size: 1.3em;
  color: ${({ theme }) => theme.accent};
`

export const Bold = styled.span`
  font-weight: 400;
`
