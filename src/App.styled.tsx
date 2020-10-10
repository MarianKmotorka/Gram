import styled, { createGlobalStyle } from 'styled-components'

export const Wrapper = styled.div`
  max-width: 1400px;
  margin: 50px auto 0 auto;
  padding: 0 10px;
  height: 100%;
  position: relative;
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

  html,
  body,
  body > div {
   height: 100vh;
   overflow: auto;
   background: ${({ theme }) => theme.bg};
 }

  p, h1, h2, h3, h4, h5, h6 {
    margin:0;
  }

  a{
    text-decoration:none;
  }
}
`
