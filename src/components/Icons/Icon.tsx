import React from 'react'
import styled from 'styled-components'

const I = styled.i<{ margin?: string }>`
  margin: ${({ margin }) => margin || '0'};
`

export interface IIconBaseProps {
  name: string
  margin?: string
  className?: string
}

const Icon: React.FC<IIconBaseProps> = ({ name, className, ...rest }) => {
  return <I {...rest} className={`${name} ${className}`} />
}

export default Icon
