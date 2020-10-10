import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;

  padding: 0 70px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.bg};
`

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.red};
  margin-right: auto;
  font-size: 20px;
`

export const StyledLink = styled(Link)`
  margin: 0 10px;
  transition: color 0.2s;

  :hover {
    color: ${({ theme }) => theme.red};
  }
`
