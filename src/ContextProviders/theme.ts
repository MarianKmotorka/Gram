import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryText: string
    secondaryText: string
    bg: string

    orange: string
    blue: string
    green: string
    white: string

    [key: string]: string
  }
}

export const lightTheme: DefaultTheme = {
  primaryText: '#000',
  secondaryText: '#777',
  bg: '#fefefe',

  orange: '#ff1e00',
  blue: '#e8f9fd',
  green: '#59ce8f',
  white: '#fff'
}
