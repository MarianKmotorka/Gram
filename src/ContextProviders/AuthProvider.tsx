import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import LoadingOverlay from '../components/Loaders/LoadingOverlay'
import { projectAuth } from '../firebase/firebaseConfig'
import { IUser } from '../domain'
import { useFirestoreDoc } from '../hooks'

interface IAuthContextValue {
  isLoggedIn: boolean
  authUser: firebase.User | null
  currentUser: IUser | undefined
  projectAuth: firebase.auth.Auth
}

const AuthContext = createContext<IAuthContextValue>(undefined!)
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [authUser, setUser] = useState<IAuthContextValue['authUser']>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, currentUserLoading] = useFirestoreDoc<IUser>(
    useCallback(x => x.doc(`users/${authUser!.uid}`), [authUser]),
    !!authUser
  )

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async usr => {
      setUser(usr)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading || currentUserLoading) return <LoadingOverlay />

  const value = {
    isLoggedIn: !!authUser,
    authUser,
    currentUser,
    projectAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
