import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../components/Input'

import { StyledCard, StyledButton, Title } from './LoginPage.styled'
import { projectAuth } from '../../config/firebaseConfig'
import MessageStripe from '../../components/MessageStripe'

const LoginPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    setError('')
    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.replace('/'))
      .catch(err => setError(err.message))
  }

  return (
    <motion.div initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
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

        <StyledButton bg='red' onClick={handleLogin}>
          Login
        </StyledButton>
      </StyledCard>
    </motion.div>
  )
}

export default LoginPage
