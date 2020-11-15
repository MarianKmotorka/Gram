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
  primary: '#283e4a',
  accent: '#fc5e49',
  bg: '#fafafa',
  bg2: '#e6e5e5',

  primaryText: '#000000',
  secondaryText: '#777777',

  red: '#ff1e00',
  lightBlue: '#e8f9fd',
  green: '#59ce8f',
  accent2: '#ccefdc',
  white: '#ffffff',
  black: '#000000',
  blackLight: '#494949',
  lightPink: '#ffaeae',

  blueGreenGradient: 'linear-gradient(60deg, #283e4a 60%, #59ce8f)',
}
