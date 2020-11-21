import React, { createContext, useCallback, useContext, useState } from 'react'

export type SetError = (err?: IError) => void

export interface IError {
  code?: string
  message: string
}

export interface IApiErrorContextValue {
  error?: IError
  setError: SetError
  removeError: () => void
}

const ApiErrorContext = createContext<IApiErrorContextValue>(undefined!)
export const useApiError = () => useContext(ApiErrorContext)

const ApiErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<IError>()

  const value = {
    error,
    setError: useCallback((error?: IError) => error && setError(error), []),
    removeError: useCallback(() => setError(undefined), []),
  }

  return <ApiErrorContext.Provider value={value}>{children}</ApiErrorContext.Provider>
}

export default ApiErrorProvider
