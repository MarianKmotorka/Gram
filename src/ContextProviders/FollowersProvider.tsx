import React, { createContext, FC, useCallback, useContext } from 'react'
import { IFollow } from '../domain'
import { useFirestoreQuery, useNotifyError } from '../hooks'
import { useAuthorizedUser } from './AuthProvider'
import { follow, unfollow } from '../services/userService'
import { useApiError } from './ApiErrorProvider'
import { propertyOf } from '../utils'

interface IProps {
  userId?: string
}

interface IContextValue {
  followings: IFollow[]
  followedBy: IFollow[]
  loading: boolean
  followingsCount: number
  followedByCount: number
  isFollowedByMe: (userId: string) => boolean
  handleFollowed: (userId: string, userNick: string) => Promise<void>
}

const FollowersContext = createContext<IContextValue>(undefined!)
export const useFollowers = () => useContext(FollowersContext)

const FollowersProvider: FC<IProps> = ({ children, userId }) => {
  const { currentUser } = useAuthorizedUser()
  const _userId = userId || currentUser.id

  const [followings, followingsLoading, followingsError] = useFirestoreQuery<IFollow>(
    useCallback(x => x.collection(`users/${_userId}/followings`), [_userId])
  )

  const [followedBy, followedByLoading, followedByError] = useFirestoreQuery<IFollow>(
    useCallback(
      x =>
        x
          .collectionGroup('followings')
          .where(propertyOf<IFollow>('userId'), '==', _userId),
      [_userId]
    )
  )

  const [myFollowings, myLoading, myError] = useFirestoreQuery<IFollow>(
    useCallback(x => x.collection(`users/${currentUser.id}/followings`), [currentUser.id])
  )

  useNotifyError(myError)
  useNotifyError(followingsError)
  useNotifyError(followedByError)
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
    followedBy,
    followedByCount: followedBy.length,
    followingsCount: followings.length,
    loading: followingsLoading || myLoading || followedByLoading,
    isFollowedByMe,
    handleFollowed,
  }

  return <FollowersContext.Provider value={value}>{children}</FollowersContext.Provider>
}

export default FollowersProvider
