import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryText: string
    secondaryText: string
    bg: string

    red: string
    lightBlue: string
    green: string
    white: string
    lightPink: string

    [key: string]: string
  }
}

export const lightTheme: DefaultTheme = {
  primaryText: '#000000',
  secondaryText: '#777777',
  bg: '#fefefe',

  red: '#ff1e00',
  lightBlue: '#e8f9fd',
  green: '#59ce8f',
  white: '#ffffff',
  lightPink: '#ffebebc7',
}
