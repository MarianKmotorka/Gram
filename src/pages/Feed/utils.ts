import { IFollow, IPost } from '../../domain'
import { propertyOf } from '../../utils/utils'

export type FeedType = 'followedOnly' | 'all'
type Firestore = firebase.firestore.Firestore

export const isFollowed = (followings: IFollow[], postUserId: string) =>
  followings.find(x => x.userId === postUserId) !== undefined

export const getPostsQuery = (all: boolean, followedUserIds: string[]) => {
  const userIds = followedUserIds.length === 0 ? ['not-existing-id'] : followedUserIds

  if (all)
    return (db: Firestore) =>
      db.collection('posts').orderBy(propertyOf<IPost>('createdAt'), 'desc')
  else
    return (db: Firestore) =>
      db
        .collection('posts')
        .where(propertyOf<IPost>('userId'), 'in', userIds)
        .orderBy(propertyOf<IPost>('createdAt'), 'desc')
}
