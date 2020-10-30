import styled, { createGlobalStyle } from 'styled-components'

export const CenteredContainer = styled.div`
  max-width: 65%;
  margin: 0 auto;
  height: 100%;

  @media only screen and (max-width: 1250px) {
    max-width: 80%;
  }

  @media only screen and (max-width: 700px) {
    max-width: 90%;
  }
`

export const AppContent = styled.div`
  height: calc(100% - 50px);
  overflow: auto;
`

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color:${({ theme }) => theme.primaryText};

  ::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 5px;
  }

  body > div {
   height: 100vh;
   overflow: auto;
   background: ${({ theme }) => theme.bg};
   overflow-x: hidden;
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
  width:0;
  height:0;
  top:0;
  left:0;
}
`
