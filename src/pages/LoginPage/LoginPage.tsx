import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../components/Input'
import { projectAuth } from '../../config/firebaseConfig'
import MessageStripe from '../../components/MessageStripe'
import { useAuthContext } from '../../ContextProviders/AuthProvider'

import { StyledCard, StyledButton, Title, Wrapper } from './LoginPage.styled'

const LoginPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn } = useAuthContext()

  if (isLoggedIn) {
    history.replace('/')
    return <></>
  }

  const handleLogin = async () => {
    setIsLoading(true)
    setError('')

    await projectAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.replace('/'))
      .catch(err => setError(err.message))

    setIsLoading(false)
  }

  return (
    <Wrapper initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
      <StyledCard bg='white'>
        <Title>Login</Title>

        {error && <MessageStripe textType='error' text={error} />}

        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          width='100%'
          label='Email'
        />

        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          width='100%'
          label='Password'
        />

        <StyledButton isLoading={isLoading} bg='red' onClick={handleLogin}>
          Login
        </StyledButton>
      </StyledCard>
    </Wrapper>
  )
}

export default LoginPage
