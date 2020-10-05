import React from 'react'
import { GlobalStyles, Wrapper } from './App.styled'
import AppContextProvider from './ContextProviders/AppContextProvider'

const App = () => {
  return (
    <AppContextProvider>
      <GlobalStyles />

      <Wrapper>APP</Wrapper>
    </AppContextProvider>
  )
}

export default App
