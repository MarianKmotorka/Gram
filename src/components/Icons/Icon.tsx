import React from 'react'
import styled from 'styled-components'

const I = styled.i<{ margin?: string; fontSize?: string }>`
  margin: ${({ margin }) => margin || '0'};
  font-size: ${({ fontSize }) => fontSize || '1em'};
`

export interface IIconBaseProps {
  name: string
  margin?: string
  fontSize?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Icon: React.FC<IIconBaseProps> = ({ name, className, ...rest }) => {
  return <I {...rest} className={`${name} ${className}`} />
}

export default Icon
