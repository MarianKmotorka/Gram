import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import { useApiErrorContext } from '../../contextProviders/ApiErrorProvider'
import { CloseIcon } from '../Icons'
import { NAVBAR_HEIGHT_NUMBER } from '../Navbar/Navbar.styled'

import { Bold, Title, Wrapper } from './ApiErrorNotification.styled'

const ApiErrorNotification: React.FC = () => {
  const { error, removeError } = useApiErrorContext()

  useEffect(() => {
    const timeoutId = setTimeout(removeError, 8000)
    return () => clearTimeout(timeoutId)
  }, [error, removeError])

  return (
    <AnimatePresence>
      {error && (
        <Wrapper
          initial={{ top: -100 }}
          animate={{ top: NAVBAR_HEIGHT_NUMBER + 20 }}
          exit={{ top: -100 }}
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
