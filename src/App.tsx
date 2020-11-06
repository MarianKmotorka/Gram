import React from 'react'

import Routes from './components/Routes/Routes'
import Navbar from './components/Navbar/Navbar'
import ApiErrorNotification from './components/ApiErrorNotification/ApiErrorNotification'

import { AppContent, GlobalStyles } from './App.styled'

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
