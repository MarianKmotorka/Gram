import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../components/Input'
import MessageStripe from '../../components/MessageStripe'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { getTimestamp, projectFirestore } from '../../config/firebaseConfig'
import { validate } from './validator'

import { StyledCard, StyledButton, Title, Wrapper } from './RegisterPage.styled'

const RegisterPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [nick, setNick] = useState('@')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { projectAuth } = useAuthContext()

  function prependNickWithAt(value: string) {
    if (!value || value[0] !== '@') return setNick('@' + value)
    return setNick(value)
  }

  async function handleRegister() {
    setIsLoading(true)

    const validationResult = await validate({ nick, email, password, confirmPassword })
    setError(validationResult.error || '')
    if (!validationResult.success) return setIsLoading(false)

    await projectAuth
      .createUserWithEmailAndPassword(email, password)
      .then(
        ({ user }) =>
          user &&
          projectFirestore
            .collection('users')
            .doc(user.uid)
            .set({ nick, createdAt: getTimestamp() })
      )
      .then(() => history.replace('/'))
      .catch(err => setError(err.message))

    setIsLoading(false)
  }

  return (
    <Wrapper initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
      <StyledCard bg='white'>
        <Title>Register</Title>

        {error && <MessageStripe textType='error' text={error} />}

        <Input value={nick} onChange={prependNickWithAt} width='100%' label='Nick' />
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
