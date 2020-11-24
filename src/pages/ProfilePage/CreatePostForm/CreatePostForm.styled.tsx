import styled from 'styled-components'
import Input from '../../../components/Inputs/Input'
import Button from '../../../components/Button/Button'

export const Header = styled.header`
  background: ${({ theme }) => theme.primary};
  padding: 10px 20px 10px 60px;
  margin-bottom: 10%;

  h2 {
    color: ${({ theme }) => theme.white};
    font-size: 1.5rem;
  }
`

export const FileInput = styled.input`
  display: none;
`

export const StyledInput = styled(Input)`
  margin-top: 20px;
`

export const StyledButton = styled(Button)`
  margin: 15px 5px 0 0;
`
