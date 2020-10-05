import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { GlobalStyles, Wrapper } from './App.styled'

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Wrapper>
        <Navbar /> APP
      </Wrapper>
    </>
  )
}

export default App
