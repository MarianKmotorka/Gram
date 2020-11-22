import React, { FC } from 'react'
import { useWindowSize } from '../../hooks'
import { CloseIcon } from '../Icons'
import { NAVBAR_HEIGHT } from '../Navbar/Navbar.styled'

import { StyledIconButon, Wrapper } from './SideBlade.styled'

interface ISideBladeProps {
  onClose: () => void
}

const getAnimationProps = (smallScreen: boolean) =>
  smallScreen
    ? {
        initial: { top: '100%' },
        animate: { top: NAVBAR_HEIGHT },
        exit: { top: '100%' },
        transition: { duration: 0.3 },
      }
    : { initial: { right: -550 }, animate: { right: 0 }, exit: { right: -550 } }

const SideBlade: FC<ISideBladeProps> = ({ onClose, children }) => {
  const { width } = useWindowSize()

  return (
    <Wrapper {...getAnimationProps(width < 550)}>
      {children}

      <StyledIconButon onClick={onClose} icon={<CloseIcon />} top='10px' left='10px' />
    </Wrapper>
  )
}

export default SideBlade
