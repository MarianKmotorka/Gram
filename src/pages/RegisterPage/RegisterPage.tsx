import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../components/Input'
import { projectAuth, projectFirestore } from '../../config/firebaseConfig'

import { StyledCard, StyledButton, Title } from './RegisterPage.styled'
import MessageStripe from '../../components/MessageStripe'

const RegisterPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    <motion.div initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
      <StyledCard bg='white'>
        <Title>Register</Title>

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

        <Input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type='password'
          width='100%'
          label='Confirm password'
        />

        <StyledButton bg='red' isLoading={isLoading} onClick={handleRegister}>
          Register
        </StyledButton>
      </StyledCard>
    </motion.div>
  )
}

export default RegisterPage
