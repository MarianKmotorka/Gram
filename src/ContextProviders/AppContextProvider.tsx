import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { lightTheme } from './theme'
import AuthProvider from './AuthProvider'
import ApiErrorProvider from './ApiErrorProvider'

const AppContextProvider: React.FC = ({ children }) => (
  <StyledComponentsThemeProvider theme={lightTheme}>
    <AuthProvider>
      <ApiErrorProvider>{children}</ApiErrorProvider>
    </AuthProvider>
  </StyledComponentsThemeProvider>
)

export default AppContextProvider
