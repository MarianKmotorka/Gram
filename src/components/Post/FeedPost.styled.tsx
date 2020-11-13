import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { lightenColor } from '../../utils/utils'
import IconButton from '../Button/IconButton'

export const Wrapper = styled.div`
  width: 100%;
  box-shadow: -5px -5px 30px rgba(0, 0, 0, 0.1), 8px 8px 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.white};
  border-radius: 30px;
  overflow: hidden;
`

export const Header = styled.div`
  padding: 20px;
  position: relative;
`

export const Title = styled.h3`
  padding: 20px 0 0 0;
  text-transform: uppercase;
`

export const AuthorSection = styled.section`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin-right: 7px;
    object-fit: cover;
    border: solid 2px ${({ theme }) => theme.green};
  }
`
export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.8em;
    i {
      margin-right: 5px;
    }
  }
`

export const AuthorName = styled(Link)`
  font-weight: bolder;
  font-size: 1.1em;

  :first-letter {
    color: ${({ theme }) => theme.green};
  }
`

export const Body = styled.div`
  position: relative;
  margin-bottom: -7px;
  img {
    width: 100%;
    cursor: pointer;
  }
`

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  left: 0;
  padding: 0 10px;
  width: 100%;
`

export const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 18px;
  margin: 5px 10px 10px;
  width: 100px;
  cursor: pointer;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => lightenColor(theme.white, 0.7)};

  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1) inset;
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.primary};
  }

  span,
  :hover span {
    color: inherit;
    font-size: smaller;
    margin-left: 5px;
  }
`

export const StyledIconButton = styled(IconButton)`
  background: ${({ theme }) => theme.white};
  font-size: 1.1rem;
  z-index: 0;
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`
