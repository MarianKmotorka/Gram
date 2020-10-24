import React, { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Posts from './Posts/Posts'
import Profile from './Profile/Profile'
import { IPost } from '../../domain/IPost'
import useFirestore from '../../hooks/useFirestore'
import LoadingOverlay from '../../components/LoadingOverlay'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { useAuthContext } from '../../contextProviders/AuthProvider'

import { CreatePostBtn, Wrapper } from './ProfilePage.styled'

const ProfilePage: React.FC<RouteComponentProps<{ userId: string }>> = ({
  match: { params },
}) => {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)
  const { user: currentUser } = useAuthContext()
  const [posts, loading] = useFirestore<IPost>(
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

  return (
    <Wrapper>
      <Profile
        nick={currentUser!.nick}
        createdAt={currentUser!.createdAt.toDate()}
        photo={currentUser!.photoURL}
      />

      {loading && <LoadingOverlay />}

      {isCurrentUser && (
        <CreatePostBtn onClick={() => setShowCreatePostForm(true)} reversed>
          New post
        </CreatePostBtn>
      )}

      {showCreatePostForm && (
        <CreatePostForm onClose={() => setShowCreatePostForm(false)} />
      )}

      <Posts areMyPosts={isCurrentUser} posts={posts} />
    </Wrapper>
  )
}

export default ProfilePage
