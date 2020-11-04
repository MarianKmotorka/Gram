import { useEffect } from 'react'
import {
  IApiErrorContextValue,
  useApiErrorContext,
} from '../contextProviders/ApiErrorProvider'

const useNotifyError = (error: IApiErrorContextValue['error'] | null) => {
  const { setError } = useApiErrorContext()

  useEffect(() => {
    error && setError(error)
  }, [error, setError])
}

export default useNotifyError
