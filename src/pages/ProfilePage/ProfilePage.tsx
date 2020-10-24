import React, { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Posts from './Posts/Posts'
import Profile from './Profile/Profile'
import { IPost, IUser } from '../../domain'
import useFirestoreQuery from '../../hooks/useFirestoreQuery'
import useFirestoreDoc from '../../hooks/useFirestoreDoc'
import LoadingOverlay from '../../components/LoadingOverlay'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { useAuthContext } from '../../contextProviders/AuthProvider'

import { CreatePostBtn, Wrapper } from './ProfilePage.styled'

const ProfilePage: React.FC<RouteComponentProps<{ userId: string }>> = ({
  match: { params },
}) => {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)
  const { user: currentUser } = useAuthContext()
  const [user, userLoading, userError] = useFirestoreDoc<IUser>(
    useCallback(x => x.collection('users').doc(params.userId), [params.userId])
  )
  const [posts, postsLoading] = useFirestoreQuery<IPost>(
    useCallback(
      x =>
        x
          .collection('posts')
          .where('userId', '==', params.userId)
          .orderBy('createdAt', 'desc'),
      [params.userId]
    )
  )

  const isCurrentUser = currentUser?.uid === params.userId

  if (postsLoading || userLoading) return <LoadingOverlay />
  if (userError) return <p>Error loading user: {userError.message}</p>

  return (
    <Wrapper>
      <Profile
        nick={user!.nick}
        createdAt={user!.createdAt.toDate()}
        photo={user!.photoUrl}
        aboutMe={user!.aboutMe}
      />

      {isCurrentUser && (
        <CreatePostBtn onClick={() => setShowCreatePostForm(true)} reversed>
          New post
        </CreatePostBtn>
      )}

      {showCreatePostForm && (
        <CreatePostForm onClose={() => setShowCreatePostForm(false)} />
      )}

      <Posts nick={user!.nick} areMyPosts={isCurrentUser} posts={posts} />
    </Wrapper>
  )
}

export default ProfilePage
