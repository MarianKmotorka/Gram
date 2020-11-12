import React from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`

export interface IBackdropProps {
  onClose?: () => any
}

const Backdrop: React.FC<IBackdropProps> = ({ children, onClose }) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement

    if (target.id === 'backdrop' && onClose) onClose()
  }

  return createPortal(
    <Wrapper
      id='backdrop'
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Wrapper>,
    document.getElementById('portal')!
  )
}

export default Backdrop
