import React, { createContext, useState, useEffect, useContext } from 'react'
import { projectAuth } from '../config/firebaseConfig'

interface IAuthContext {
  isLoggedIn: boolean
  user: firebase.User | null
}

const AuthContext = createContext<IAuthContext>(undefined!)
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(setUser)
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
