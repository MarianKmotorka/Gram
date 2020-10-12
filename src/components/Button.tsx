import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button<{ bg?: string }>`
  outline: none;
  border-radius: 18px;
  border: 1px solid ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};

  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  padding: 8px 20px;
  background: ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};
  color: ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};
    background: ${({ theme }) => theme.white};
    i {
      color: ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};
    }
  }

  i {
    color: ${({ theme }) => theme.white};
  }
`

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  bg?: string
}

const Button: React.FC<IProps> = ({ children, isLoading, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {isLoading ? <i className='fas fa-circle-notch fa-spin'></i> : children}
    </StyledButton>
  )
}

export default Button
