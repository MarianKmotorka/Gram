import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { projectAuth } from '../config/firebaseConfig'

const Signout = () => {
  const history = useHistory()

  useEffect(() => {
    const signout = async () => {
      await projectAuth.signOut()
      history.replace('/')
    }

    signout()
  }, [history])

  return <p>Signing out...</p>
}

export default Signout
