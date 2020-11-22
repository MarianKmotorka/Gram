import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { NAVBAR_HEIGHT_PX } from '../../../../components/Navbar/Navbar.styled'
import { TAB_BAR_HEIGHT_PX } from '../../../../components/TabView/Container/TabViewContainer.styled'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bg2};
`

export const RowsContainer = styled.div`
  height: calc(100vh - ${NAVBAR_HEIGHT_PX} - ${TAB_BAR_HEIGHT_PX} - 150px);
  overflow: auto;
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.accent2};
  }
`

export const Row = styled(Link)`
  margin: 0 30px;
  color: ${({ theme }) => theme.white};
  display: block;
  padding: 7px;

  ::first-letter {
    color: ${({ theme }) => theme.accent2};
  }
`

export const Title = styled.h1`
  font-weight: 300;
  font-size: 0.9rem;
  padding: 15px 0 5px;
  margin: 0 30px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.white};
`

export const SearchContainer = styled.div`
  height: 40px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.white};
  border-radius: 3px;
  overflow: hidden;
  margin: 15px 30px;

  i {
    margin: 0 10px;
    color: ${({ theme }) => theme.primary};
  }
`

export const Search = styled.input`
  outline: none;
  border: none;
  font-size: 0.9rem;
  height: 100%;
  width: 100%;
`
