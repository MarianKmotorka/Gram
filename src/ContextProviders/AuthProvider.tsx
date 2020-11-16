import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

import { IUser } from '../domain'
import { useFirestoreDoc } from '../hooks'
import { propertyOf } from '../utils/utils'
import { ErrorWhileLoadingData, LoadingOverlay } from '../components'
import { getTimestamp, projectAuth, projectFirestore } from '../firebase/firebaseConfig'

type AuthContextValue =
  | { isLoggedIn: false; projectAuth: firebase.auth.Auth }
  | {
      isLoggedIn: true
      authUser: firebase.User
      currentUser: IUser
      projectAuth: firebase.auth.Auth
    }

const AuthContext = createContext<AuthContextValue>(undefined!)

export const useAuth = () => useContext(AuthContext)

export const useAuthorizedUser = () => {
  const auth = useAuth()

  if (!auth.isLoggedIn)
    throw new Error('You cannot use this hook where user is not logged in.')

  return auth
}

const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AuthContextValue>({ isLoggedIn: false, projectAuth })
  const [authUser, setAuthUser] = useState<firebase.User>()
  const [showSpinner, setShowSpinner] = useState(true)

  const [userResponse] = useFirestoreDoc<IUser>(
    useCallback(x => x.doc(`users/${authUser!.uid}`), [authUser]),
    { startFetching: !!authUser }
  )

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async user => {
      if (user) {
        await projectFirestore
          .doc(`users/${user.uid}`)
          .set({ [propertyOf<IUser>('lastLogin')]: getTimestamp() }, { merge: true })

        setAuthUser(user) // Note: this line needs to be bellow updating lastLogin
      } else {
        setState(x => ({ ...x, isLoggedIn: false }))
        setShowSpinner(false)
      }
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (userResponse.loading || userResponse.error || !authUser) return
    setState(x => ({ ...x, authUser, currentUser: userResponse.data, isLoggedIn: true }))
    setShowSpinner(false)
  }, [userResponse, authUser])

  if (!userResponse.loading && userResponse.error)
    return <ErrorWhileLoadingData error={userResponse.error} />

  if (showSpinner) return <LoadingOverlay />

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
