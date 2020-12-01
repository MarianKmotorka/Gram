import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useObserver, useUrlQueryParams } from '../../../hooks'
import { IPost } from '../../../domain'
import { LoadingRow } from '../../../components'
import PostDetailPage from '../../PostDetailPage/PostDetailPage'
import { GridIcon, RoundSquareIcon } from '../../../components/Icons'

import {
  BottomDiv,
  Grid,
  Image,
  LayoutControls,
  VerticalSeparator,
  Video,
  Wrapper,
} from './Posts.styled'

interface IPostsProps {
  posts: IPost[]
  loading?: boolean
  loadMore: () => void
  refresh: () => void
}

const Posts: React.FC<IPostsProps> = ({ posts, loading, loadMore, refresh }) => {
  const { location, push } = useHistory()
  const { postId: selectedPostId } = useUrlQueryParams()

  const [displayGrid, setDisplayGrid] = useState(true)
  const observe = useObserver<HTMLDivElement>(loadMore, !loading)

  return (
    <Wrapper>
      {selectedPostId && (
        <PostDetailPage
          postId={selectedPostId as string}
          afterDeletedCallback={refresh}
          onClose={() => push(location.pathname)}
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
        {posts.map(x =>
          x.mediaType.startsWith('image') ? (
            <Image
              key={x.id}
              src={x.mediaUrl}
              smallScreenGrid={displayGrid}
              onClick={() => push(`${location.pathname}?postId=${x.id}`)}
            />
          ) : (
            <Video
              key={x.id}
              src={x.mediaUrl}
              smallScreenGrid={displayGrid}
              onClick={() => push(`${location.pathname}?postId=${x.id}`)}
            />
          )
        )}
      </Grid>

      {loading && <LoadingRow />}

      <BottomDiv ref={observe} />
    </Wrapper>
  )
}

export default Posts
