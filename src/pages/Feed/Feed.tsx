import React, { useCallback } from 'react'

import { IPost } from '../../domain'
import { useFirestoreQuery } from '../../hooks'
import FeedPost from '../../components/Post/FeedPost'
import LoadingOverlay from '../../components/LoadingOverlay'

import { PostsContainer, Wrapper } from './Feed.styled'

const Feed: React.FC = () => {
  const [posts, loading] = useFirestoreQuery<IPost>(
    useCallback(db => db.collection('posts').orderBy('createdAt', 'desc'), [])
  )

  return (
    <Wrapper>
      {loading && <LoadingOverlay />}

      <PostsContainer>
        {posts.map(x => (
          <FeedPost post={x} />
        ))}
      </PostsContainer>
    </Wrapper>
  )
}

export default Feed
