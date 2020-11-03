import React, { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Posts from './Posts/Posts'
import Profile from './Profile/Profile'
import { IPost, IUser } from '../../domain'
import { PlusIcon } from '../../components/Icons'
import Button from '../../components/Button/Button'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import LoadingOverlay from '../../components/Loaders/LoadingOverlay'
import { useFirestoreDoc, usePagedQuery, useWindowSize } from '../../hooks'

import { DraggableWrapper, Wrapper } from './ProfilePage.styled'

const ProfilePage: React.FC<RouteComponentProps<{ userId: string }>> = ({
  match: { params },
}) => {
  const { height } = useWindowSize()
  const { authUser } = useAuthContext()
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)

  const [user, userLoading, userError] = useFirestoreDoc<IUser>(
    useCallback(x => x.collection('users').doc(params.userId), [params.userId])
  )
  const [posts, postsLoading, loadMore] = usePagedQuery<IPost>(
    useCallback(
      x =>
        x
          .collection('posts')
          .where('userId', '==', params.userId)
          .orderBy('createdAt', 'desc'),
      [params.userId]
    ),
    6
  )

  const isCurrentUser = authUser?.uid === params.userId

  if (userLoading) return <LoadingOverlay />
  if (userError) return <p>Error loading user: {userError.message}</p>

  return (
    <Wrapper>
      <Profile user={user!} isCurrentUser={isCurrentUser} />

      {isCurrentUser && (
        <DraggableWrapper
          drag='y'
          dragMomentum={false}
          dragConstraints={{ bottom: 0, top: 200 - height }}
        >
          <Button onClick={() => setShowCreatePostForm(true)} reversed>
            <PlusIcon />
            <span>New</span>
          </Button>
        </DraggableWrapper>
      )}

      <AnimatePresence>
        {showCreatePostForm && (
          <CreatePostForm user={user!} onClose={() => setShowCreatePostForm(false)} />
        )}
      </AnimatePresence>

      <Posts
        nick={user!.nick}
        areMyPosts={isCurrentUser}
        posts={posts}
        loadMore={loadMore}
        loading={postsLoading}
      />
    </Wrapper>
  )
}

export default ProfilePage
