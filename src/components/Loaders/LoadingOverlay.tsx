import React from 'react'
import styled from 'styled-components'

import { LoadingIcon } from '../Icons'

import { NAVBAR_HEIGHT } from '../Navbar/Navbar.styled'

const Overlay = styled.div`
  position: absolute;
  top: ${NAVBAR_HEIGHT};
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const LoadingOverlay = () => (
  <Overlay>
    <LoadingIcon />
  </Overlay>
)

export default LoadingOverlay
