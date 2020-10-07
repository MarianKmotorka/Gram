import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Input from '../../components/Input'

import { StyledCard, StyledButton } from './LoginPage.styled'

const LoginPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <StyledCard bg='white'>
      <Input
        value={userName}
        onChange={e => setUsername(e.target.value)}
        width='100%'
        label='Username'
      />

      <Input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type='password'
        width='100%'
        label='Password'
      />
      <StyledButton bg='orange'>Login</StyledButton>
    </StyledCard>
  )
}

export default LoginPage
