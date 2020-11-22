import React, { useState } from 'react'

import { useObserver } from '../../../hooks'
import { IPost, IUser } from '../../../domain'
import { LoadingRow } from '../../../components'
import PostDetailPage from '../../PostDetailPage/PostDetailPage'
import { GridIcon, RoundSquareIcon } from '../../../components/Icons'
import { useFollowers } from '../../../contextProviders/FollowersProvider'

import {
  BottomDiv,
  Grid,
  Image,
  LayoutControls,
  VerticalSeparator,
  Wrapper,
} from './Posts.styled'

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
  const [selectedPost, setSelectedPost] = useState<IPost>()
  const observe = useObserver<HTMLDivElement>(loadMore, !loading)
  const { handleFollowed, isFollowedByMe: isFollowed } = useFollowers()

  return (
    <Wrapper>
      {selectedPost && (
        <PostDetailPage
          postId={selectedPost.id}
          afterDeletedCallback={refresh}
          canDelete={postsOwner.id === currentUser.id}
          canFollow={currentUser.id !== postsOwner.id}
          onClose={() => setSelectedPost(undefined)}
          isFollowed={isFollowed(selectedPost.userId)}
          onFollow={async () =>
            await handleFollowed(selectedPost.userId, selectedPost.userNick)
          }
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
            onClick={() => setSelectedPost(x)}
            smallScreenGrid={displayGrid}
          />
        ))}
      </Grid>

      {loading && <LoadingRow />}

      <BottomDiv ref={observe} />
    </Wrapper>
  )
}

export default Posts
