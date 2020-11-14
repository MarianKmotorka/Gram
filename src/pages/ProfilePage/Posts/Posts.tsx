import React, { useState } from 'react'

import { useObserver } from '../../../hooks'
import { IPost, IUser } from '../../../domain'
import { deletePost } from '../../../services/postService'
import LoadingRow from '../../../components/Loaders/LoadingRow'
import PostDetailPage from '../../PostDetailPage/PostDetailPage'
import { GridIcon, RoundSquareIcon } from '../../../components/Icons'
import { useApiError } from '../../../contextProviders/ApiErrorProvider'

import { BottomDiv, Grid, Image, LayoutControls, VerticalSeparator } from './Posts.styled'

interface IPostsProps {
  posts: IPost[]
  loading?: boolean
  postsOwner: IUser
  currentUser: IUser
  loadMore: () => void
  refresh: () => void
}

const Posts: React.FC<IPostsProps> = ({
  posts,
  loading,
  postsOwner,
  currentUser,
  loadMore,
  refresh,
}) => {
  const [displayGrid, setDisplayGrid] = useState(true)
  const [selectedPostId, setSelectedPostId] = useState<string>()
  const observe = useObserver<HTMLDivElement>(loadMore, !loading)
  const { setError } = useApiError()

  const handlePostDeleted = async (post: IPost) => {
    await deletePost(post, setError)
    setSelectedPostId(undefined)
    refresh()
  }

  return (
    <>
      {selectedPostId && (
        <PostDetailPage
          postId={selectedPostId}
          canDelete={postsOwner.id === currentUser.id}
          onDelete={handlePostDeleted}
          onClose={() => setSelectedPostId(undefined)}
        />
      )}

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
