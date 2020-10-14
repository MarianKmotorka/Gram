import React, { createContext, useState, useEffect, useContext } from 'react'
import LoadingOverlay from '../components/LoadingOverlay'
import { projectAuth } from '../config/firebaseConfig'

interface IAuthContextValue {
  isLoggedIn: boolean
  user: firebase.User | null
  projectAuth: firebase.auth.Auth
}

const AuthContext = createContext<IAuthContextValue>(undefined!)
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(usr => {
      setUser(usr)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading) return <LoadingOverlay />

  const value = {
    isLoggedIn: !!user,
    user,
    projectAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
