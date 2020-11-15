import { motion } from 'framer-motion'
import styled from 'styled-components'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Inputs/Input'

export const Wrapper = styled(motion.div)`
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  background-color: ${({ theme }) => theme.bg};
  max-width: 900px;
  width: 90%;
  padding-bottom: 20px;

  @media only screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
    border-radius: 0;

    display: flex;
    flex-direction: column;

    header {
      margin-bottom: 10%;
    }
  }
`

export const Header = styled.header`
  border-radius: 15px 15px 0 0;
  background: ${({ theme }) => theme.white};
  padding: 10px 20px;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  h2 {
    color: ${({ theme }) => theme.primary};
    font-size: 1.5rem;
  }

  i {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    padding: 15px 17px;
    border-radius: 50%;
    color: ${({ theme }) => theme.primary};
    transition: background-color 0.3s;

    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`

export const FileInput = styled.input`
  display: none;
`

export const StyledInput = styled(Input)`
  margin-top: 20px;
`

export const StyledButton = styled(Button)<{ marginLeft?: string }>`
  margin: 15px 5px 0 0;
`
