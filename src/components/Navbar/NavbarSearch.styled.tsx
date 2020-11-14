import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

export const Wrapper = styled(motion.div)<{ focused: boolean }>`
  flex: 1;
  padding: 0 15px;

  input {
    padding: 3px;
  }

  ${({ focused }) =>
    focused &&
    css`
      @media only screen and (max-width: 600px) {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        padding: 0;

        > div {
          max-width: 100vw;
        }
      }

      input {
        font-size: 1.2em;
      }
    `}
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 5;
  height: 100%;
  width: 100%;
`
