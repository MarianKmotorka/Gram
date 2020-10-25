import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../components/Input'
import MessageStripe from '../../components/MessageStripe'
import { useAuthContext } from '../../contextProviders/AuthProvider'

import { StyledCard, StyledButton, Title, Wrapper } from './LoginPage.styled'

const LoginPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { projectAuth } = useAuthContext()

  const handleLogin = async () => {
    setIsLoading(true)
    setError('')

    await projectAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.replace('/'))
      .catch(err => {
        setIsLoading(false)
        setError(err.message)
      })
  }

  return (
    <Wrapper initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
      <StyledCard bg='white'>
        <Title>Login</Title>

        {error && <MessageStripe textType='error' text={error} />}

        <Input value={email} onChange={setEmail} width='100%' label='Email' />

        <Input
          value={password}
          onChange={setPassword}
          type='password'
          width='100%'
          label='Password'
        />

        <StyledButton isLoading={isLoading} onClick={handleLogin}>
          Login
        </StyledButton>
      </StyledCard>
    </Wrapper>
  )
}

export default LoginPage
