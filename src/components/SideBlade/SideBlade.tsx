import React, { FC } from 'react'
import { CloseIcon } from '../Icons'
import { useWindowSize } from '../../hooks'
import IconButton from '../Button/IconButton'

import { Wrapper } from './SideBlade.styled'
import { NAVBAR_HEIGHT } from '../Navbar/Navbar.styled'

interface ISideBladeProps {
  bg?: string
  onClose?: () => void
  closeIcon?: React.ReactNode
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

const SideBlade: FC<ISideBladeProps> = ({ onClose, children, closeIcon, bg }) => {
  const { width } = useWindowSize()

  return (
    <Wrapper {...getAnimationProps(width < 550)} bg={bg}>
      {children}

      {onClose && (
        <IconButton
          onClick={onClose}
          icon={closeIcon || <CloseIcon />}
          top='5px'
          left='5px'
        />
      )}
    </Wrapper>
  )
}

export default SideBlade
