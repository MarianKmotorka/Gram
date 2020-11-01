import { motion } from 'framer-motion'
import styled from 'styled-components'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input'

export const Wrapper = styled(motion.div)`
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  background-color: ${({ theme }) => theme.bg};
  width: 98%;
  max-width: 900px;
  padding-bottom: 20px;
`

export const Header = styled.header`
  border-radius: 25px 25px 0 0;
  background: ${({ theme }) => theme.blueGreenGradient};
  padding: 15px 25px;
  position: relative;

  h2 {
    color: ${({ theme }) => theme.white};
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`

export const FileInput = styled.input`
  display: none;
`

export const StyledInput = styled(Input)`
  margin-top: 20px;
`

export const StyledButton = styled(Button)<{ marginLeft?: string }>`
  transform: scale(1);
  margin: 15px 10px 0 0;
`
