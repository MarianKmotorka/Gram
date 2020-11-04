import React, { createContext, useCallback, useContext, useState } from 'react'

interface IError {
  code?: string
  message: string
}

export interface IApiErrorContextValue {
  error?: IError
  setError: (error: IError) => void
  removeError: () => void
}

const ApiErrorContext = createContext<IApiErrorContextValue>(undefined!)
export const useApiErrorContext = () => useContext(ApiErrorContext)

const ApiErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<IApiErrorContextValue['error']>(undefined)

  const value = {
    error,
    setError,
    removeError: useCallback(() => setError(undefined), []),
  }

  return <ApiErrorContext.Provider value={value}>{children}</ApiErrorContext.Provider>
}

export default ApiErrorProvider
