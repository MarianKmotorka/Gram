import React, { createContext, FC, useCallback, useContext } from 'react'
import { propertyOf } from '../utils'
import { IFollow, IUser } from '../domain'
import { useApiError } from './ApiErrorProvider'
import { useAuthorizedUser } from './AuthProvider'
import { FieldPath } from '../firebase/firebaseConfig'
import { follow, unfollow } from '../services/userService'
import { useFirestoreQuery, useNotifyError } from '../hooks'

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
  handleFollowed: (userToFollowId: string, usertoFollowNick: string) => Promise<void>
}

const FollowersContext = createContext<IContextValue>(undefined!)
export const useFollowers = () => useContext(FollowersContext)

const FollowersProvider: FC<IProps> = ({ children, userId }) => {
  const { currentUser } = useAuthorizedUser()
  const _userId = userId || currentUser.id

  const [followings, followingsLoading, followingsError] = useFirestoreQuery<IFollow>(
    useCallback(x => x.collection(`users/${_userId}/followings`), [_userId])
  )

  const [myFollowings, myLoading, myError] = useFirestoreQuery<IFollow>(
    useCallback(x => x.collection(`users/${currentUser.id}/followings`), [currentUser.id])
  )

  useNotifyError(myError)
  useNotifyError(followingsError)

  const { setError } = useApiError()

  const isFollowedByMe = (userId: string) =>
    myFollowings.find(x => x.userId === userId) !== undefined

  const handleFollowed = async (userToFollowId: string, userToFollowNick: string) => {
    const { id } = currentUser
    if (isFollowedByMe(userToFollowId)) await unfollow(id, userToFollowId, setError)
    else
      await follow(id, { userId: userToFollowId, userNick: userToFollowNick }, setError)
  }

  const { followedBy, followedByLoading } = useFollowedBy(_userId)

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

const useFollowedBy = (userId: string) => {
  const { documentId } = FieldPath

  const [, followedByLoading, followedByError, followedByDocs] = useFirestoreQuery<
    IFollow
  >(
    useCallback(
      x =>
        x
          .collectionGroup('followings')
          .where(propertyOf<IFollow>('userId'), '==', userId),
      [userId]
    )
  )

  const [
    followedByUsers,
    followedByUsersLoading,
    followedByUsersError,
  ] = useFirestoreQuery<IUser>(
    useCallback(
      x =>
        x
          .collection('users')
          .where(documentId(), 'in', [
            ...followedByDocs.map(x => x.ref.parent.parent?.id),
            'not-existing-id',
          ]),
      [followedByDocs, documentId]
    ),
    { startFetching: !followedByLoading }
  )

  useNotifyError(followedByError)
  useNotifyError(followedByUsersError)

  return {
    followedBy: followedByUsers.map(x => ({ userId: x.id, userNick: x.nick })),
    followedByLoading: followedByUsersLoading,
  }
}
