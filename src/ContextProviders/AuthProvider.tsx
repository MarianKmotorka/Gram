import React, { createContext, useState, useEffect, useContext } from 'react'
import LoadingOverlay from '../components/Loaders/LoadingOverlay'
import { projectAuth } from '../config/firebaseConfig'

interface IAuthContextValue {
  isLoggedIn: boolean
  authUser: firebase.User | null
  projectAuth: firebase.auth.Auth
}

const AuthContext = createContext<IAuthContextValue>(undefined!)
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [authUser, setUser] = useState<IAuthContextValue['authUser']>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async usr => {
      setUser(usr)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading) return <LoadingOverlay />

  const value = {
    isLoggedIn: !!authUser,
    authUser,
    projectAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
