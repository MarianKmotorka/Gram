import styled from 'styled-components'

const Button = styled.button<{ bg?: string }>`
  outline: none;
  border-radius: 18px;
  border: 1px solid ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};

  font-size: 18px;
  cursor: pointer;
  transition:background-color 0.2s,color 0.2s;

  padding: 8px 20px;
  background: ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};
  color: ${({ theme }) => theme.white};

  :hover{
    color: ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};
    background: ${({ theme }) => theme.white};
  }
`

export default Button
