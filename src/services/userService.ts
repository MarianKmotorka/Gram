import { IFollow } from '../domain'
import { projectFirestore } from '../firebase/firebaseConfig'
import { SetError } from '../contextProviders/ApiErrorProvider'

export const follow = async (followerId: string, followee: IFollow, setError: SetError) =>
  await projectFirestore
    .collection(`users/${followerId}/followings`)
    .doc(followee.userId)
    .set(followee)
    .catch(setError)

export const unfollow = async (
  followerId: string,
  followeeId: string,
  setError: SetError
) =>
  await projectFirestore
    .doc(`users/${followerId}/followings/${followeeId}`)
    .delete()
    .catch(setError)
