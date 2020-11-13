import React, { FC } from 'react'
import styled from 'styled-components'
import { IError } from '../../contextProviders/ApiErrorProvider'

const Wrapper = styled.div`
  padding: 25px;
  font-size: 1.1rem;
  pre {
    margin-top: 15px;
  }
`
interface IErrorWhileLoadingDataProps {
  error?: IError
}

const ErrorWhileLoadingData: FC<IErrorWhileLoadingDataProps> = ({ error }) => {
  return (
    <Wrapper>
      Error while loading data.
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </Wrapper>
  )
}

export default ErrorWhileLoadingData
