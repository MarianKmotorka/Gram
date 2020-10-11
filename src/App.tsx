import React from 'react'

import Routes from './components/Routes'
import Navbar from './components/Navbar/Navbar'

import { AppContent, GlobalStyles, CenteredContainer } from './App.styled'

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Navbar />

      <AppContent>
        <CenteredContainer>
          <Routes />
        </CenteredContainer>
      </AppContent>
    </>
  )
}

export default App
