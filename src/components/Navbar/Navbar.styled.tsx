import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { lightenColor } from '../../utils/utils'
import { BurgerMenuIcon } from '../Icons'

export const NAVBAR_HEIGHT = '66px'

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  height: ${NAVBAR_HEIGHT};
  width: 100%;
  padding: 0 17.5%;

  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.bg};

  @media only screen and (max-width: 1250px) {
    padding: 0 10%;
  }

  @media only screen and (max-width: 700px) {
    padding: 0 5%;
  }
`

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.black};
  font-size: 22px;
  margin-right: 20px;
  font-weight: 500;

  ::first-letter {
    color: ${({ theme }) => theme.red};
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

    background: ${({ theme }) => theme.bg};
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

  background-color: ${({ theme, isDark }) =>
    isDark ? lightenColor(theme.black, 0.7) : theme.redLight};

  :hover {
    background: ${({ theme, isDark }) =>
      isDark ? theme.redLight : lightenColor(theme.black, 0.7)};
  }

  i {
    color: inherit;
  }

  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 70px;
    text-align: center;
    padding: 20px 0;
  }
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
    background-color: ${({ theme }) => theme.black};
  }

  @media only screen and (max-width: 900px) {
    display: flex;
    align-items: center;
  }
`
