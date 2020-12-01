import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { lightenColor } from '../../utils'
import Button from '../Button/Button'
import IconButton from '../Button/IconButton'

export const Wrapper = styled.div`
  width: 100%;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 15px;
  overflow: hidden;

  @media only screen and (max-width: 400px) {
    border-radius: 0;
    box-shadow: none;
  }
`

export const Header = styled.div`
  padding: 20px 20px 0;
  position: relative;
`

export const Title = styled.h3`
  padding: 10px 0;
  color: ${({ theme }) => theme.white};
`

export const AuthorSection = styled.section`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin-right: 7px;
    object-fit: cover;
    border: solid 2px ${({ theme }) => theme.accent2};
  }
`
export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.7em;
    color: ${({ theme }) => theme.accent};
    margin-top: 2px;
  }
  i {
    margin-right: 5px;
    margin-left: 2px;
    color: ${({ theme }) => theme.accent};
  }
`

export const AuthorName = styled(Link)`
  font-size: 1rem;
  color: ${({ theme }) => theme.white};

  :first-letter {
    color: ${({ theme }) => theme.accent2};
  }
`

export const Body = styled.div`
  position: relative;
  max-height: 700px;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    cursor: pointer;
    display: block;
  }

  video {
    width: 100%;
    max-height: 100%;
    object-fit: contain;

    :focus,
    :active {
      outline: none;
    }
  }
`

export const ButtonsContainer = styled.div<{ bottom: string }>`
  border-radius: 15px;
  overflow: hidden;
  position: absolute;
  bottom: ${({ bottom }) => bottom};
  right: 20px;
`

export const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  padding: 10px 18px;
  font-size: 18px;
  width: 100px;
  cursor: pointer;
  transition: background-color 0.2s;

  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => lightenColor(theme.white, 0.7)};

  i {
    cursor: inherit;
  }

  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3) inset;
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
  background: transparent;
  font-size: 1.1rem;
  z-index: 0;
  i {
    color: ${({ theme }) => theme.accent};
  }

  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

export const StyledButton = styled(Button)`
  transform: scale(0.8);
  position: absolute;
  right: 15px;
  top: 15px;
`
