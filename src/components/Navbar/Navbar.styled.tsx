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

  & > :first-child {
    margin-right: 10%;
  }
`

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.red};
  font-size: 20px;
`

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`

export const StyledLink = styled(Link)`
  margin: 0 20px;
  transition: color 0.2s;

  :hover {
    color: ${({ theme }) => theme.red};
  }
`
