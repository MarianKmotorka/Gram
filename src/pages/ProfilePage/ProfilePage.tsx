import React, { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Posts from './Posts/Posts'
import Profile from './Profile/Profile'
import { IPost, IUser } from '../../domain'
import { PlusIcon } from '../../components/Icons'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { useFirestoreDoc, usePagedQuery, useWindowSize } from '../../hooks'
import { Button, ErrorWhileLoadingData, LoadingOverlay } from '../../components'

import { DraggableWrapper, Wrapper } from './ProfilePage.styled'
import FollowersProvider from '../../contextProviders/FollowersProvider'

const ProfilePage: React.FC<RouteComponentProps<{ userId: string }>> = ({
  match: { params },
}) => {
  const { height } = useWindowSize()
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
          <DraggableWrapper
            drag='y'
            dragMomentum={false}
            dragConstraints={{ bottom: 0, top: 200 - height }}
          >
            <Button onClick={() => setShowCreatePostForm(true)}>
              <PlusIcon />
              <span>New</span>
            </Button>
          </DraggableWrapper>
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
          currentUser={currentUser}
          postsOwner={userResponse.data}
          refresh={refresh}
          loadMore={loadMore}
        />
      </Wrapper>
    </FollowersProvider>
  )
}

export default ProfilePage
