import React, { useState } from 'react'

import { IPost, IUser } from '../../../domain'
import { useObserver } from '../../../hooks'
import { propertyOf } from '../../../utils/utils'
import LoadingRow from '../../../components/Loaders/LoadingRow'
import { GridIcon, RoundSquareIcon } from '../../../components/Icons'
import { useApiErrorContext } from '../../../contextProviders/ApiErrorProvider'
import PostDetail from '../../../components/Post/Detail/PostDetail'
import { isLiked } from '../../../utils/postUtils'
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
  onLike: (post: IPost) => Promise<void>
}

const Posts: React.FC<IPostsProps> = ({
  areMyPosts,
  posts,
  nick,
  loading,
  loadMore,
  refresh,
  onLike,
}) => {
  const [displayGrid, setDisplayGrid] = useState(true)
  const [selectedPostId, setSelectedPostId] = useState<string>()
  const observe = useObserver<HTMLDivElement>(loadMore, !loading)
  const { setError } = useApiErrorContext()

  const getPostById = (id: string) => posts.find(x => x.id === id)!

  const handlePostDeleted = async (post: IPost) => {
    const { increment } = FieldValue

    await Promise.all([
      projectStorage.refFromURL(post.imageUrl).delete(),
      projectFirestore.collection('posts').doc(post.id).delete(),
      projectFirestore
        .doc(`users/${post.userId}`)
        .update({ [propertyOf<IUser>('postCount')]: increment(-1) }),
    ]).catch(setError)

    setSelectedPostId(undefined)
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

      {selectedPostId && (
        <PostDetail
          post={getPostById(selectedPostId)}
          onClose={() => setSelectedPostId(undefined)}
          isLiked={isLiked(getPostById(selectedPostId), nick)}
          onLike={async () => await onLike(getPostById(selectedPostId))}
        />
      )}

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
            onClick={() => setSelectedPostId(x.id)}
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
