import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { BurgerMenuIcon } from '../Icons'

export const NAVBAR_HEIGHT_PX = '66px'
export const NAVBAR_HEIGHT = 66
export const NAVBAR_BREAKPOINT_PX = '1100px'
export const NAVBAR_BREAKPOINT = 1100

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  height: ${NAVBAR_HEIGHT_PX};
  width: 100%;
  padding: 0 12.5%;

  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.primary};

  @media only screen and (max-width: 1250px) {
    padding: 0 10%;
  }

  @media only screen and (max-width: 700px) {
    padding: 0 5%;
  }
`

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.white};
  font-size: 1.4rem;
  font-weight: 500;

  ::first-letter {
    color: ${({ theme }) => theme.accent2};
  }
`

export const LinksContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 100%;

  @media only screen and (max-width: ${NAVBAR_BREAKPOINT_PX}) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 60px 0;
    position: absolute;
    top: 100%;
    right: 0;
    width: 100vw;
    max-width: 400px;
    height: calc(100vh - ${NAVBAR_HEIGHT_PX});

    background: ${({ theme }) => theme.primary};
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 120px;
  padding: 0 20px;
  transition: background-color 0.2s, color 0.2s;
  position: relative;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.primary};

  i {
    cursor: pointer;
  }

  &.active {
    i {
      color: ${({ theme }) => theme.accent2};
    }
  }

  > * {
    color: inherit;
    transition: inherit;
    font-size: 1.15rem;
  }

  @media only screen and (max-width: ${NAVBAR_BREAKPOINT_PX}) {
    width: 200px;
    height: 90px;
    justify-content: flex-start;
    background-color: inherit;

    i {
      min-width: 50px;
      display: inline-block;
      text-align: center;
    }

    span {
      font-size: 0.9rem;
      border-left: solid 1px;
      padding-left: 10px;
      letter-spacing: 2px;
    }
  }

  @media only screen and (min-width: ${NAVBAR_BREAKPOINT + 1}px) {
    flex-direction: column;
    align-items: center;
    padding-top: 5px;

    span {
      font-size: 0.9rem;
      font-weight: 300;
      margin-top: 3px;
    }

    :hover i {
      color: ${({ theme }) => theme.accent2};
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
    border: 2px solid ${({ theme }) => theme.accent2};
  }

  p {
    font-weight: bolder;
  }

  p::first-letter {
    color: ${({ theme }) => theme.accent2};
  }
`

export const StyledMenuIcon = styled(BurgerMenuIcon)`
  display: none;
  cursor: pointer;
  font-size: 1.6rem;
  margin-left: auto;
  padding: 0 5px;
  color: ${({ theme }) => theme.accent};

  @media only screen and (max-width: ${NAVBAR_BREAKPOINT_PX}) {
    display: block;
  }
`
