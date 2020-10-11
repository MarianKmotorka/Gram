import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import AuthProvider from './AuthProvider'
import { lightTheme } from './theme'

const AppContextProvider: React.FC = ({ children }) => (
  <StyledComponentsThemeProvider theme={lightTheme}>
    <AuthProvider>{children}</AuthProvider>
  </StyledComponentsThemeProvider>
)

export default AppContextProvider
