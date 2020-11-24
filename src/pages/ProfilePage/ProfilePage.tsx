import React, { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Posts from './Posts/Posts'
import Profile from './Profile/Profile'
import { IPost, IUser } from '../../domain'
import { PlusIcon } from '../../components/Icons'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import FollowersProvider from '../../contextProviders/FollowersProvider'
import { useFirestoreDoc, usePagedQuery } from '../../hooks'
import { ErrorWhileLoadingData, LoadingOverlay } from '../../components'

import { NewPostButton, Wrapper } from './ProfilePage.styled'

const ProfilePage: React.FC<RouteComponentProps<{ userId: string }>> = ({
  match: { params },
}) => {
  const { currentUser } = useAuthorizedUser()
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)

  const [userResponse] = useFirestoreDoc<IUser>(`users/${params.userId}`)
  const [posts, postsLoading, loadMore, , refresh, postsErr] = usePagedQuery<IPost>(
    useCallback(
      x =>
        x
          .collection('posts')
          .where('userId', '==', params.userId)
          .orderBy('createdAt', 'desc'),
      [params.userId]
    ),
    { pageSize: 6 }
  )

  if (userResponse.loading) return <LoadingOverlay />
  if (userResponse.error || postsErr)
    return <ErrorWhileLoadingData error={userResponse.error || postsErr} />

  const isCurrentUser = currentUser.id === params.userId

  const handlePostCreated = () => {
    setShowCreatePostForm(false)
    refresh()
  }

  return (
    <FollowersProvider userId={params.userId}>
      <Wrapper>
        <Profile user={userResponse.data} isCurrentUser={isCurrentUser} />

        {isCurrentUser && (
          <NewPostButton onClick={() => setShowCreatePostForm(true)} color='accent2'>
            <PlusIcon />
            <span>New</span>
          </NewPostButton>
        )}

        <AnimatePresence>
          {showCreatePostForm && (
            <CreatePostForm
              user={userResponse.data}
              onPostCreated={handlePostCreated}
              onClose={() => setShowCreatePostForm(false)}
            />
          )}
        </AnimatePresence>

        <Posts
          posts={posts}
          loading={postsLoading}
          refresh={refresh}
          loadMore={loadMore}
        />
      </Wrapper>
    </FollowersProvider>
  )
}

export default ProfilePage
