import React, { useState } from 'react'

import { useObserver } from '../../../hooks'
import { IPost, IUser } from '../../../domain'
import { LoadingRow } from '../../../components'
import PostDetailPage from '../../PostDetailPage/PostDetailPage'
import { GridIcon, RoundSquareIcon } from '../../../components/Icons'

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

  return (
    <>
      {selectedPostId && (
        <PostDetailPage
          postId={selectedPostId}
          afterDeletedCallback={refresh}
          canDelete={postsOwner.id === currentUser.id}
          onClose={() => setSelectedPostId(undefined)}
        />
      )}

      <LayoutControls>
        <RoundSquareIcon
          color={displayGrid ? 'bg2' : 'accent2'}
          onClick={() => setDisplayGrid(false)}
        />
        <VerticalSeparator />
        <GridIcon
          color={displayGrid ? 'accent2' : 'bg2'}
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
