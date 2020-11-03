import React from 'react'
import styled from 'styled-components'

interface IStyledProps {
  margin?: string
  fontSize?: string
  color?: string
}

const I = styled.i<IStyledProps>`
  margin: ${({ margin }) => margin || '0'};
  font-size: ${({ fontSize }) => fontSize || '1em'};
  color: ${({ color, theme }) => (color ? theme[color] : theme.black)};
`

export interface IIconBaseProps {
  name: string
  margin?: string
  color?: string
  fontSize?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Icon: React.FC<IIconBaseProps> = ({ name, className, ...rest }) => {
  return <I {...rest} className={`${name} ${className}`} />
}

export default Icon
