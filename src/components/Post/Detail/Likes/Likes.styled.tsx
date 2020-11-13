import styled from 'styled-components'
import { TAB_BAR_HEIGHT_PX } from '../../../TabView/Container/TabViewContainer.styled'

export const Wrapper = styled.div`
  max-height: calc(100vh - ${TAB_BAR_HEIGHT_PX});
  width: 100%;
  padding: 15px 20px;
`

export const Title = styled.h1`
  font-weight: 300;
  font-size: 0.9rem;
  padding: 15px 0 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`

export const SearchContainer = styled.div`
  height: 40px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.white};
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 15px;

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

export const Row = styled.p`
  height: 50px;
  display: block;
  font-size: 1.1em;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 5px 10px;

  ::first-letter {
    color: ${({ theme }) => theme.green};
  }
`

export const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - ${TAB_BAR_HEIGHT_PX} - 150px);
  overflow-y: auto;
`
