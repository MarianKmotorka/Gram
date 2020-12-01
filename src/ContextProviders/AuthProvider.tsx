import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import omit from 'lodash/omit'

import { IUser } from '../domain'
import { useFirestoreDoc } from '../hooks'
import { propertyOf } from '../utils'
import { ErrorWhileLoadingData, LoadingOverlay } from '../components'
import {
  getTimestamp,
  projectAuth,
  projectFirestore as db,
  projectStorage,
} from '../firebase/firebaseConfig'

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
  // Update script for renaming imageUrl to mediaUrl for existing records
  useEffect(() => {
    const renameProp = async () => {
      const posts = await db.collection('posts').get()

      posts.forEach(async x => {
        const oldPost = x.data()
        const metadata = await projectStorage.refFromURL(oldPost.imageUrl).getMetadata()
        const newPost = omit(
          {
            ...oldPost,
            mediaType: metadata.contentType,
            mediaUrl: oldPost.imageUrl,
          },
          ['imageUrl']
        )

        await db.doc('posts/' + x.id).set(newPost)
      })
    }

    renameProp()
  }, [])

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
        await db
          .doc(`users/${user.uid}`)
          .update({ [propertyOf<IUser>('lastLogin')]: getTimestamp() })

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
