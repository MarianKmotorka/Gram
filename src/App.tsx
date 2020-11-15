import React from 'react'
import { ApiErrorNotification, Navbar, Routes } from './components'
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
