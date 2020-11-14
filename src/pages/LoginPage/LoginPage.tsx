import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

import Input from '../../components/Inputs/Input'
import MessageStripe from '../../components/MessageStripe'
import { useAuth } from '../../contextProviders/AuthProvider'

import { StyledCard, StyledButton, Title, Wrapper } from './LoginPage.styled'

const LoginPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { projectAuth } = useAuth()

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
    <>
      <Wrapper>
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

          <StyledButton isLoading={isLoading} onClick={handleLogin} reversed>
            Login
          </StyledButton>
        </StyledCard>
      </Wrapper>

      <Footer />
    </>
  )
}

export default LoginPage
