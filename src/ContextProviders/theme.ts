import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryText: string
    secondaryText: string
    bg: string

    red: string
    redLight: string
    lightBlue: string
    green: string
    white: string
    black: string
    blackLight: string
    grayBlue: string
    lightPink: string

    blueGreenGradient: string

    [key: string]: string
  }
}

export const lightTheme: DefaultTheme = {
  primaryText: '#000000',
  secondaryText: '#777777',
  bg: '#f5f5f5',

  red: '#ff1e00',
  redLight: '#fc5e49',
  lightBlue: '#e8f9fd',
  green: '#59ce8f',
  white: '#ffffff',
  black: '#000000',
  blackLight: '#494949',
  grayBlue: '#283e4a',
  lightPink: '#ffebebc7',

  blueGreenGradient: 'linear-gradient(60deg, #283e4a 60%, #59ce8f)',
}
