import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../components/Input'
import MessageStripe from '../../components/MessageStripe'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { projectFirestore } from '../../config/firebaseConfig'

import { StyledCard, StyledButton, Title, Wrapper } from './RegisterPage.styled'

const RegisterPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn, projectAuth } = useAuthContext()

  if (isLoggedIn) {
    history.replace('/')
    return <></>
  }

  const createUserRecord = (user: firebase.User) =>
    projectFirestore
      .collection('users')
      .doc(user.uid)
      .set({ info: 'some additional info' })

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords doesn't match.")
      return
    }

    setIsLoading(true)
    setError('')
    await projectAuth
      .createUserWithEmailAndPassword(email, password)
      .then(creds => creds.user && createUserRecord(creds.user))
      .then(() => history.replace('/'))
      .catch(err => setError(err.message))

    setIsLoading(false)
  }

  return (
    <Wrapper initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
      <StyledCard bg='white'>
        <Title>Register</Title>

        {error && <MessageStripe textType='error' text={error} />}

        <Input value={email} onChange={setEmail} width='100%' label='Email' />

        <Input
          value={password}
          onChange={setPassword}
          type='password'
          width='100%'
          label='Password'
        />

        <Input
          value={confirmPassword}
          onChange={setConfirmPassword}
          type='password'
          width='100%'
          label='Confirm password'
        />

        <StyledButton isLoading={isLoading} onClick={handleRegister}>
          Register
        </StyledButton>
      </StyledCard>
    </Wrapper>
  )
}

export default RegisterPage
