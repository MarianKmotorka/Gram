import React, { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { IPost } from '../../domain/IPost'
import useFirestore from '../../hooks/useFirestore'
import LoadingOverlay from '../../components/LoadingOverlay'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import Posts from './Posts/Posts'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import Button from '../../components/Button/Button'
import Profile from './Profile/Profile'

import { Wrapper } from './ProfilePage.styled'

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

  return (
    <Wrapper>
      <Profile />

      <Button onClick={() => setShowCreatePostForm(true)}>New post</Button>

      {loading && <LoadingOverlay />}

      {showCreatePostForm && (
        <CreatePostForm onClose={() => setShowCreatePostForm(false)} />
      )}

      <Posts areMyPosts={currentUser?.uid === params.userId} posts={posts} />
    </Wrapper>
  )
}

export default ProfilePage
