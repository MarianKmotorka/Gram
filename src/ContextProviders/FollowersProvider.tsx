import React, { createContext, FC, useCallback, useContext } from 'react'
import { IFollow } from '../domain'
import { useFirestoreQuery, useNotifyError } from '../hooks'
import { useAuthorizedUser } from './AuthProvider'
import { follow, unfollow } from '../services/userService'
import { useApiError } from './ApiErrorProvider'

interface IProps {
  userId?: string
}

interface IContextValue {
  followings: IFollow[]
  loading: boolean
  followingsCount: number
  isFollowedByMe: (userId: string) => boolean
  handleFollowed: (userId: string, userNick: string) => Promise<void>
}

const FollowersContext = createContext<IContextValue>(undefined!)
export const useFollowers = () => useContext(FollowersContext)

const FollowersProvider: FC<IProps> = ({ children, userId }) => {
  const { currentUser } = useAuthorizedUser()
  const _userId = userId || currentUser.id

  const [followings, loading, error] = useFirestoreQuery<IFollow>(
    useCallback(x => x.collection(`users/${_userId}/followings`), [_userId])
  )

  const [myFollowings, myLoading, myError] = useFirestoreQuery<IFollow>(
    useCallback(x => x.collection(`users/${currentUser.id}/followings`), [currentUser.id])
  )

  useNotifyError(error)
  useNotifyError(myError)
  const { setError } = useApiError()

  const isFollowedByMe = (userId: string) =>
    myFollowings.find(x => x.userId === userId) !== undefined

  const handleFollowed = async (userId: string, userNick: string) => {
    const { id } = currentUser
    if (isFollowedByMe(userId)) await unfollow(id, userId, setError)
    else await follow(id, { userId: userId, userNick: userNick }, setError)
  }

  const value = {
    followings,
    followingsCount: followings.length,
    loading: loading || myLoading,
    isFollowedByMe,
    handleFollowed,
  }

  return <FollowersContext.Provider value={value}>{children}</FollowersContext.Provider>
}

export default FollowersProvider
