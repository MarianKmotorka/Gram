import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryText: string
    secondaryText: string
    bg: string
    bg2: string

    red: string
    accent: string
    lightBlue: string
    green: string
    accent2: string
    white: string
    black: string
    blackLight: string
    primary: string
    lightPink: string

    blueGreenGradient: string

    [key: string]: string
  }
}

export const lightTheme: DefaultTheme = {
  primary: '#14274e',
  accent: '#9ba4b4',
  bg: '#f1f6f9',
  bg2: '#394867',

  primaryText: '#000000',
  secondaryText: '#777777',

  red: '#fc5e49',
  lightBlue: '#e8f9fd',
  green: '#59ce8f',
  accent2: '#ccefdc',
  white: '#ffffff',
  black: '#000000',
  blackLight: '#494949',
  lightPink: '#ffaeae',

  blueGreenGradient: 'linear-gradient(60deg, #283e4a 60%, #59ce8f)',
}
