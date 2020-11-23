import styled, { createGlobalStyle } from 'styled-components'
import { NAVBAR_HEIGHT_PX } from './components/Navbar/Navbar.styled'

export const AppContent = styled.div`
  height: calc(100% - ${NAVBAR_HEIGHT_PX});
  overflow: auto;
  position: relative;

  @media only screen and (max-width: 400px) {
    ::-webkit-scrollbar {
      width: 2px;
    }
  }
`

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color:${({ theme }) => theme.primaryText};

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
   background: ${({ theme }) => theme.bg2};
    }
  ::-webkit-scrollbar-track {
   background: transparent;
    border-radius: 5px;
  }

  body > div {
   height: 100vh;
   background: ${({ theme }) => theme.bg};
   overflow-x: hidden;
   overflow-y: auto;
 }

  p, h1, h2, h3, h4, h5, h6 {
    margin:0;
  }

  a{
    text-decoration:none;
  }
}

#portal{
  position:fixed;
  top:0;
  left:0;
  z-index:1000;
  background-color:transparent;
}

input, textarea { // needs to stay below #portal for some reason
  -webkit-appearance:none; // fixes box-shadow on input element for ios
}
`
