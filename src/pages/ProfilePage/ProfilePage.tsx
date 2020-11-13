import React, { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Posts from './Posts/Posts'
import Profile from './Profile/Profile'
import { IPost, IUser } from '../../domain'
import { PlusIcon } from '../../components/Icons'
import Button from '../../components/Button/Button'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import LoadingOverlay from '../../components/Loaders/LoadingOverlay'
import { isLiked, likePost } from '../../services/postService'
import { useFirestoreDoc, usePagedQuery, useWindowSize } from '../../hooks'

import { DraggableWrapper, Wrapper } from './ProfilePage.styled'
import ErrorWhileLoadingData from '../../components/Loaders/ErrorWhileLoadingData'

const ProfilePage: React.FC<RouteComponentProps<{ userId: string }>> = ({
  match: { params },
}) => {
  const { height } = useWindowSize()
  const { currentUser } = useAuthorizedUser()
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)

  const userResponse = useFirestoreDoc<IUser>(
    useCallback(x => x.collection('users').doc(params.userId), [params.userId])
  )
  const [posts, postsLoading, loadMore, , refresh, postsErr, modifyPost] = usePagedQuery<
    IPost
  >(
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

  if (userResponse.loading) return <LoadingOverlay />
  if (userResponse.error || postsErr)
    return <ErrorWhileLoadingData error={userResponse.error || postsErr} />

  const isCurrentUser = currentUser.id === params.userId

  const handleLiked = async (post: IPost) => {
    const { nick } = currentUser
    await likePost(post, nick)

    const newLikes = isLiked(post, currentUser.nick)
      ? post.likes.filter(x => x !== currentUser.nick)
      : [...post.likes, currentUser.nick]

    modifyPost({ ...post, likes: newLikes })
  }

  const handlePostCreated = () => {
    setShowCreatePostForm(false)
    refresh()
  }

  return (
    <Wrapper>
      <Profile user={userResponse.data} isCurrentUser={isCurrentUser} />

      {isCurrentUser && (
        <DraggableWrapper
          drag='y'
          dragMomentum={false}
          dragConstraints={{ bottom: 0, top: 200 - height }}
        >
          <Button
            primaryColor='primary'
            onClick={() => setShowCreatePostForm(true)}
            reversed
          >
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
        postsOwner={userResponse.data}
        loading={postsLoading}
        currentUser={currentUser}
        refresh={refresh}
        loadMore={loadMore}
        onLike={handleLiked}
      />
    </Wrapper>
  )
}

export default ProfilePage
