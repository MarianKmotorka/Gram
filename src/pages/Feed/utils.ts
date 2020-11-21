import { IPost } from '../../domain'
import { propertyOf } from '../../utils'

export type FeedType = 'followed' | 'all' | 'mine'
type Firestore = firebase.firestore.Firestore

export const getPostsQuery = (
  feedType: FeedType,
  followedUserIds: string[],
  currUserId: string
) => {
  // firebase doesn't like empty array with 'in' operator
  const userIds = followedUserIds.length === 0 ? ['not-existing-id'] : followedUserIds

  switch (feedType) {
    case 'all':
      return (db: Firestore) =>
        db.collection('posts').orderBy(propertyOf<IPost>('createdAt'), 'desc')
    case 'followed':
      return (db: Firestore) =>
        db
          .collection('posts')
          .where(propertyOf<IPost>('userId'), 'in', userIds)
          .orderBy(propertyOf<IPost>('createdAt'), 'desc')
    case 'mine':
      return (db: Firestore) =>
        db
          .collection('posts')
          .where(propertyOf<IPost>('userId'), '==', currUserId)
          .orderBy(propertyOf<IPost>('createdAt'), 'desc')
  }
}
