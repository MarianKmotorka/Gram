import styled from 'styled-components'

const Button = styled.button<{ bg?: string }>`
  outline: none;
  border-radius: 18px;
  border: none;

  font-size: 18px;

  cursor: pointer;

  padding: 8px 20px;
  background: ${({ theme, bg }) => (bg ? theme[bg] : theme.white)};
  color: ${({ theme }) => theme.white};
`

export default Button
