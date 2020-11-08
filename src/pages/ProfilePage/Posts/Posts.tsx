import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { IPost, IUser } from '../../../domain'
import { useObserver } from '../../../hooks'
import Post from '../../../components/Post/Post'
import { propertyOf } from '../../../utils/utils'
import LoadingRow from '../../../components/Loaders/LoadingRow'
import { GridIcon, RoundSquareIcon } from '../../../components/Icons'
import { useApiErrorContext } from '../../../contextProviders/ApiErrorProvider'
import {
  FieldValue,
  projectFirestore,
  projectStorage,
} from '../../../firebase/firebaseConfig'

import { BottomDiv, Grid, Image, LayoutControls, VerticalSeparator } from './Posts.styled'

interface IPostsProps {
  nick: string
  areMyPosts: boolean
  posts: IPost[]
  loading?: boolean
  loadMore: () => void
  refresh: () => void
}

const Posts: React.FC<IPostsProps> = ({
  areMyPosts,
  posts,
  nick,
  loading,
  loadMore,
  refresh,
}) => {
  const [displayGrid, setDisplayGrid] = useState(true)
  const [selectedPost, setSelectedPost] = useState<IPost>()
  const observe = useObserver<HTMLDivElement>(loadMore, !loading)
  const { setError } = useApiErrorContext()

  const handlePostDeleted = async (post: IPost) => {
    const { increment } = FieldValue

    await Promise.all([
      projectStorage.refFromURL(post.imageUrl).delete(),
      projectFirestore.collection('posts').doc(post.id).delete(),
      projectFirestore
        .doc(`users/${post.userId}`)
        .update({ [propertyOf<IUser>('postCount')]: increment(-1) }),
    ]).catch(setError)

    setSelectedPost(undefined)
    refresh()
  }

  return (
    <>
      <LayoutControls>
        <RoundSquareIcon
          color={displayGrid ? 'primary' : 'accent'}
          onClick={() => setDisplayGrid(false)}
        />
        <VerticalSeparator />
        <GridIcon
          color={displayGrid ? 'accent' : 'primary'}
          onClick={() => setDisplayGrid(true)}
        />
      </LayoutControls>

      <AnimatePresence>
        {selectedPost && (
          <Post
            post={selectedPost}
            onClose={() => setSelectedPost(undefined)}
            onDelete={handlePostDeleted}
            canDelete={areMyPosts}
          />
        )}
      </AnimatePresence>

      {posts.length === 0 && (
        <p>
          {areMyPosts
            ? 'You have no posts yet ... :(('
            : `${nick} has no posts yet ... :((`}
        </p>
      )}

      <Grid smallScreenGrid={displayGrid}>
        {posts.map(x => (
          <Image
            key={x.id}
            src={x.imageUrl}
            onClick={() => setSelectedPost(x)}
            smallScreenGrid={displayGrid}
          />
        ))}
      </Grid>

      {loading && <LoadingRow />}

      <BottomDiv ref={observe} />
    </>
  )
}

export default Posts
