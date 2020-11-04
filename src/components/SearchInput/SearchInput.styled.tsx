import styled from 'styled-components'
import { motion } from 'framer-motion'
import { lightenColor } from '../../utils/utils'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  border: 1px ${({ theme }) => theme.black} solid;
  border-radius: 3px;

  display: flex;
  align-items: center;
  position: relative;

  width: 100%;
  padding: 2px 8px;
  max-width: 400px;
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
  top: calc(100% + 1px);
  left: 0;
  z-index: 10;
  overflow: hidden;

  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
`

export const Row = styled.div<{ fontSize?: number }>`
  height: 40px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px`};

  :hover {
    background-color: ${({ theme }) => lightenColor(theme.green, 0.1)};
  }

  > i {
    color: ${({ theme }) => theme.green};
    font-size: 20px;
    margin: 0 auto;
  }
`
