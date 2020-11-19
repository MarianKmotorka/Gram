import React from 'react'
import styled from 'styled-components'

interface IIconButtonProps {
  visibility?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  position?: string
  icon: React.ReactNode
  onClick: () => void
}

interface IStyledProps {
  visibility?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  position?: string
}

const Container = styled.button<IStyledProps>`
  position: ${({ top, left, bottom, right, position }) =>
    position ? position : top || left || bottom || right ? 'absolute' : 'static'};

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

  font-size: inherit;
  border: none;
  outline: none;

  i {
    cursor: inherit;
  }

  :hover {
    background-color: rgba(100, 100, 100, 0.5);
  }
`

const IconButton = ({ icon, ...rest }: IIconButtonProps) => {
  return <Container {...rest}>{icon}</Container>
}

export default IconButton
