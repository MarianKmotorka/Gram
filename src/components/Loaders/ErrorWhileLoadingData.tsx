import React, { FC } from 'react'
import styled from 'styled-components'

import { useNotifyError } from '../../hooks'
import { IError } from '../../contextProviders/ApiErrorProvider'

const Wrapper = styled.div`
  padding: 25px;
  font-size: 1rem;
`
interface IErrorWhileLoadingDataProps {
  error?: IError
}

const ErrorWhileLoadingData: FC<IErrorWhileLoadingDataProps> = ({ error }) => {
  useNotifyError(error)

  return <Wrapper>Something went wrong.</Wrapper>
}

export default ErrorWhileLoadingData
