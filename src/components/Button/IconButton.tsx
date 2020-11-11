import React from 'react'
import styled from 'styled-components'

interface IIconButtonProps {
  visibility?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  icon: React.ReactNode
  onClick: () => void
}

interface IStyledProps {
  visibility?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
}

const Container = styled.div<IStyledProps>`
  position: ${({ top, left, bottom, right }) =>
    top || left || bottom || right ? 'absolute' : 'static'};

  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  visibility: ${({ visibility }) => visibility || 'visible'};

  display: grid;
  place-items: center;
  z-index: 4;
  height: 45px;
  width: 45px;
  cursor: pointer;

  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const IconButton = ({ icon, ...rest }: IIconButtonProps) => {
  return <Container {...rest}>{icon}</Container>
}

export default IconButton
