import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { lightTheme } from './theme'

const AppContextProvider: React.FC = ({ children }) => (
  <StyledComponentsThemeProvider theme={lightTheme}>
    {children}
  </StyledComponentsThemeProvider>
)

export default AppContextProvider
