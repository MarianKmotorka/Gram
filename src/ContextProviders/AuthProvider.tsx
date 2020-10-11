import React, { createContext, useState, useEffect, useContext } from 'react'
import LoadingOverlay from '../components/LoadingOverlay'
import { projectAuth } from '../config/firebaseConfig'

interface IAuthContext {
  isLoggedIn: boolean
  user: firebase.User | null
}

const AuthContext = createContext<IAuthContext>(undefined!)
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

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
