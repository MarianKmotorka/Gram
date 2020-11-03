import React, { useCallback } from 'react'

import { IPost } from '../../domain'
import { usePagedQuery } from '../../hooks'
import FeedPost from '../../components/Post/FeedPost'
import LoadingOverlay from '../../components/LoadingOverlay'

import { PostsContainer, Wrapper } from './Feed.styled'

const Feed: React.FC = () => {
  const [posts, loading, nextPage, hasMore] = usePagedQuery<IPost>(
    useCallback(db => db.collection('posts').orderBy('createdAt', 'desc'), [])
  )

  return (
    <Wrapper>
      {loading && <LoadingOverlay />}

      <PostsContainer>
        {posts.map(x => (
          <FeedPost post={x} key={x.id} />
        ))}
      </PostsContainer>

      <button onClick={nextPage} disabled={!hasMore}>
        {hasMore ? 'LOAD MORE' : 'NOTHING TO LOAD'}
      </button>
    </Wrapper>
  )
}

export default Feed
