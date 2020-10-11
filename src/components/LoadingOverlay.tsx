import React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  i {
    color: ${({ theme }) => theme.red};
  }
`

const LoadingOverlay = () => (
  <Overlay>
    <i className='fas fa-circle-notch fa-2x fa-spin'></i>
  </Overlay>
)

export default LoadingOverlay
