import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;

  height: 50px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  padding: 0 70px;

  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.orange};
  margin-right: auto;
  font-size: 20px;
`

export const StyledLink = styled(Link)`
  margin: 0 10px;
  transition: color 0.2s;

  :hover {
    color: ${({ theme }) => theme.orange};
  }
`
