import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import { CloseIcon } from '../Icons'
import { useApiError } from '../../providers/ApiErrorProvider'

import { NAVBAR_HEIGHT } from '../Navbar/Navbar.styled'
import { Bold, Title, Wrapper } from './ApiErrorNotification.styled'

const ApiErrorNotification: React.FC = () => {
  const { error, removeError } = useApiError()

  useEffect(() => {
    const timeoutId = setTimeout(removeError, 8000)
    return () => clearTimeout(timeoutId)
  }, [error, removeError])

  return (
    <AnimatePresence>
      {error && (
        <Wrapper
          initial={{ top: -100 }}
          animate={{ top: NAVBAR_HEIGHT + 20 }}
          exit={{ top: -400 }}
        >
          <Title>Error</Title>
          {error.code && <Bold>{error.code}:</Bold>}
          <p>{error.message}</p>
          <CloseIcon onClick={removeError} />
        </Wrapper>
      )}
    </AnimatePresence>
  )
}

export default ApiErrorNotification
