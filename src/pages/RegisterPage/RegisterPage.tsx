import React, { useState } from "react"
import { motion } from "framer-motion"
import { RouteComponentProps } from "react-router-dom"

import Input from "../../components/Input"
import { projectAuth } from "../../config/firebaseConfig"

import { StyledCard, StyledButton, Title } from "./RegisterPage.styled"
import MessageStripe from "../../components/MessageStripe"

const RegisterPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = () => {
    setError("")
    projectAuth
      .createUserWithEmailAndPassword(email, password)
      .catch(err => setError(err.message))
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

        <StyledButton bg='red' onClick={handleRegister}>
          Register
        </StyledButton>
      </StyledCard>
    </motion.div>
  )
}

export default RegisterPage
