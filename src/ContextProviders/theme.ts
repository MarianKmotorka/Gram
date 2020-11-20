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
    gray: string
    primary: string
    lightPink: string

    [key: string]: string
  }
}

export const lightTheme: DefaultTheme = {
  primary: '#303841',
  accent: '#ea9215',
  accent2: '#ff9600',
  bg: '#eeeeee',
  bg2: '#3a4750',

  primaryText: '#000000',
  secondaryText: '#777777',

  red: '#fc5e49',
  lightBlue: '#e8f9fd',
  green: '#59ce8f',
  white: '#ffffff',
  black: '#000000',
  gray: '#494949',
  lightPink: '#ffaeae',
}
