import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BurgerMenuIcon } from '../Icons'

export const NAVBAR_HEIGHT = '66px'
export const NAVBAR_HEIGHT_NUMBER = 66

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  height: ${NAVBAR_HEIGHT};
  width: 100%;
  padding: 0 17.5%;

  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.grayBlue};

  @media only screen and (max-width: 1250px) {
    padding: 0 10%;
  }

  @media only screen and (max-width: 700px) {
    padding: 0 5%;
  }
`

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.white};
  font-size: 22px;
  font-weight: 500;

  ::first-letter {
    color: ${({ theme }) => theme.redLight};
  }
`

export const LinksContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 100%;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 60px 0;
    position: absolute;
    top: 100%;
    right: 0;
    width: 90vw;
    max-width: 400px;
    height: calc(100vh - ${NAVBAR_HEIGHT});

    background: ${({ theme }) => theme.grayBlue};
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`

export const StyledLink = styled(Link)<{ isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 120px;
  padding: 0 20px;
  font-size: 1.1em;
  color: ${({ theme }) => theme.white};
  transition: background-color 0.2s;
  position: relative;

  background-color: ${({ theme, isDark }) =>
    isDark ? theme.blackLight : theme.redLight};

  :hover {
    background: ${({ theme }) => theme.blackLight};
  }

  > * {
    color: inherit;
    font-size: 20px;
  }

  > * + * {
    margin-left: 7px;
  }

  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 70px;
    text-align: center;
    padding: 20px 0;
  }

  @media only screen and (min-width: 901px) {
    span {
      display: none;
    }

    :hover span {
      display: block;
      position: absolute;
      margin: 0;
      padding: 10px;
      width: 100%;
      font-size: 18px;
      text-align: center;
      background: ${({ theme }) => theme.blackLight};

      top: calc(100% + 10px);
      left: 0;
      z-index: 10;
    }
  }
`

export const SearchContainer = styled.div`
  flex: 1;
  margin: 0 15px;
`

export const DropdownRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-right: 8px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.green};
  }

  p {
    font-weight: bolder;
  }

  p::first-letter {
    color: ${({ theme }) => theme.green};
  }
`

export const StyledMenuIcon = styled(BurgerMenuIcon)`
  display: none;
  height: 100%;
  cursor: pointer;
  font-size: 22px;
  margin-left: auto;
  padding: 0 20px;

  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.redLight};

  :hover {
    background-color: ${({ theme }) => theme.blackLight};
  }

  @media only screen and (max-width: 900px) {
    display: flex;
    align-items: center;
  }
`
