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
import {
  useFirestoreDoc,
  useNotifyError,
  usePagedQuery,
  useWindowSize,
} from '../../hooks'

import { DraggableWrapper, Wrapper } from './ProfilePage.styled'
import { FieldValue, projectFirestore } from '../../firebase/firebaseConfig'
import { isLiked } from '../../utils/postUtils'

const ProfilePage: React.FC<RouteComponentProps<{ userId: string }>> = ({
  match: { params },
}) => {
  const { height } = useWindowSize()
  const { currentUser } = useAuthContext()
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)

  const [user, userLoading, userError] = useFirestoreDoc<IUser>(
    useCallback(x => x.collection('users').doc(params.userId), [params.userId])
  )
  const [posts, postsLoading, loadMore, , refresh, , modifyPost] = usePagedQuery<IPost>(
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

  useNotifyError(userError)

  if (userLoading) return <LoadingOverlay />
  if (userError) return <></>

  const isCurrentUser = currentUser?.id === params.userId

  const handleLiked = async (post: IPost) => {
    const { arrayUnion, arrayRemove } = FieldValue
    const arrayOperation = isLiked(post, currentUser!.nick) ? arrayRemove : arrayUnion

    await projectFirestore
      .doc(`posts/${post.id}`)
      .update({ likes: arrayOperation(currentUser!.nick) })

    const newLikes = isLiked(post, currentUser!.nick)
      ? post.likes.filter(x => x !== currentUser!.nick)
      : [...post.likes, currentUser!.nick]

    modifyPost({ ...post, likes: newLikes })
  }

  const handlePostCreated = () => {
    setShowCreatePostForm(false)
    refresh()
  }

  return (
    <Wrapper>
      <Profile user={user!} isCurrentUser={isCurrentUser} />

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
            user={user!}
            onPostCreated={handlePostCreated}
            onClose={() => setShowCreatePostForm(false)}
          />
        )}
      </AnimatePresence>

      <Posts
        posts={posts}
        nick={user!.nick}
        loading={postsLoading}
        areMyPosts={isCurrentUser}
        refresh={refresh}
        loadMore={loadMore}
        onLike={handleLiked}
      />
    </Wrapper>
  )
}

export default ProfilePage
