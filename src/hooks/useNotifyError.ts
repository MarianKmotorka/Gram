import { useEffect } from 'react'
import { IApiErrorContextValue, useApiError } from '../contextProviders/ApiErrorProvider'

const useNotifyError = (error: IApiErrorContextValue['error'] | null) => {
  const { setError } = useApiError()

  useEffect(() => {
    error && setError(error)
  }, [error, setError])
}

export default useNotifyError
