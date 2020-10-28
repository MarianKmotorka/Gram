import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Wrapper = styled.div`
  border: 1px ${({ theme }) => theme.black} solid;
  border-radius: 3px;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;

  position: relative;
`

export const StyledInput = styled(motion.input)`
  border: none;
  outline: none;
  font-size: 0.9em;
  margin-left: 7px;
  width: 100%;
`

export const RowsContainer = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: 100%;
  z-index: 10;

  background-color: ${({ theme }) => theme.bg};
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
`
