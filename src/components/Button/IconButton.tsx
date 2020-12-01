import React from 'react'
import styled from 'styled-components'

interface IIconButtonProps extends IStyledProps {
  icon: React.ReactNode
  onClick?: () => void
}

interface IStyledProps {
  visibility?: string
  bg?: string
  top?: string
  left?: string
  scale?: number
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
  transform: ${({ scale }) => `scale(${scale || 1})`};
  cursor: pointer;

  border-radius: 50%;
  background-color: ${({ bg, theme }) => (bg && theme[bg]) || 'rgba(0, 0, 0, 0.3)'};
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
