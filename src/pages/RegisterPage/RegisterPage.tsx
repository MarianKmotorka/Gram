import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { IUser } from '../../domain'
import { validate } from './validator'
import { useAuth } from '../../contextProviders/AuthProvider'
import { MessageStripe, Footer, Input } from '../../components'
import { getTimestamp, projectFirestore } from '../../firebase/firebaseConfig'

import { StyledCard, StyledButton, Title, Wrapper } from './RegisterPage.styled'

const RegisterPage: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [nick, setNick] = useState('@')
  const [password, setPassword] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { projectAuth } = useAuth()

  function prependNickWithAt(value: string) {
    const lowerCaseValue = value.toLowerCase()

    if (!lowerCaseValue || lowerCaseValue[0] !== '@') return setNick('@' + lowerCaseValue)
    return setNick(lowerCaseValue)
  }

  async function handleRegister() {
    setIsLoading(true)

    const validationResult = await validate({ nick, email, password })
    setError(validationResult.error || '')
    if (!validationResult.success) return setIsLoading(false)

    await projectAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser: Omit<IUser, 'id'> = {
          nick,
          aboutMe,
          postCount: 0,
          photoUrl: null,
          createdAt: getTimestamp() as firebase.firestore.Timestamp,
        }

        user && projectFirestore.collection('users').doc(user.uid).set(newUser)
      })
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
            value={aboutMe}
            onChange={setAboutMe}
            width='100%'
            label='About me'
            rows={4}
          />

          <StyledButton isLoading={isLoading} onClick={handleRegister} reversed>
            Register
          </StyledButton>
        </StyledCard>
      </Wrapper>

      <Footer />
    </>
  )
}

export default RegisterPage
