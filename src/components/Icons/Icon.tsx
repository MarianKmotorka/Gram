import React from 'react'
import styled from 'styled-components'

const I = styled.i<{ margin?: string }>`
  margin: ${({ margin }) => margin || '0'};
`

export interface IIconProps {
  name: string
  margin?: string
}

const Component: React.FC<IIconProps> = ({ name, ...rest }) => {
  return <I {...rest} className={name} />
}

export default Component
