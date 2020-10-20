import React, { createContext, useState, useEffect, useContext } from 'react'
import LoadingOverlay from '../components/LoadingOverlay'
import { projectAuth, projectFirestore } from '../config/firebaseConfig'

interface ICurrentUser extends firebase.User {
  nick: string
}

interface IAuthContextValue {
  isLoggedIn: boolean
  user: ICurrentUser | null
  projectAuth: firebase.auth.Auth
}

const AuthContext = createContext<IAuthContextValue>(undefined!)
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ICurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  const getUserNickAndPhoto = async (usr: firebase.User) => {
    const user = await projectFirestore.collection('users').doc(usr.uid).get()
    const nick = user.data()?.nick
    const photoUrl = user.data()?.photoUrl
    return { ...usr, nick, photoUrl }
  }

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async usr => {
      setUser(usr ? await getUserNickAndPhoto(usr) : null)
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
