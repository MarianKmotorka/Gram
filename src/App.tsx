import React from 'react'

import Routes from './components/Routes/Routes'
import Navbar from './components/Navbar/Navbar'

import { AppContent, GlobalStyles } from './App.styled'
import ApiErrorNotification from './components/ApiErrorNotification/ApiErrorNotification'

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Navbar />

      <AppContent>
        <Routes />
      </AppContent>

      <ApiErrorNotification />
    </>
  )
}

export default App
