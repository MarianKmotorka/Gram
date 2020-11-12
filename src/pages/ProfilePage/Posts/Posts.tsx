import React, { useState } from 'react'

import { IPost, IUser } from '../../../domain'
import { useObserver } from '../../../hooks'
import LoadingRow from '../../../components/Loaders/LoadingRow'
import { GridIcon, RoundSquareIcon } from '../../../components/Icons'
import { useApiErrorContext } from '../../../contextProviders/ApiErrorProvider'
import PostDetail from '../../../components/Post/Detail/PostDetail'
import { isLiked, deletePost } from '../../../services/postService'

import { BottomDiv, Grid, Image, LayoutControls, VerticalSeparator } from './Posts.styled'

interface IPostsProps {
  posts: IPost[]
  loading?: boolean
  postsOwner: IUser
  currentUser: IUser
  loadMore: () => void
  refresh: () => void
  onLike: (post: IPost) => Promise<void>
}

const Posts: React.FC<IPostsProps> = ({
  posts,
  loading,
  postsOwner,
  currentUser,
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
    await deletePost(post, setError)
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
          canDelete={postsOwner.id === currentUser.id}
          onDelete={handlePostDeleted}
          post={getPostById(selectedPostId)}
          onClose={() => setSelectedPostId(undefined)}
          isLiked={isLiked(getPostById(selectedPostId), currentUser.nick)}
          onLike={async () => await onLike(getPostById(selectedPostId))}
        />
      )}

      {posts.length === 0 && <p>Nothing here ... :(</p>}

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
