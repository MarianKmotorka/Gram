import React, { useCallback } from 'react'

import { IPost } from '../../domain'
import FeedPost from '../../components/Post/FeedPost'
import { useNotifyError, useObserver, usePagedQuery } from '../../hooks'
import LoadingRow from '../../components/Loaders/LoadingRow'

import { BottomDiv, PostsContainer, Wrapper } from './Feed.styled'

const Feed: React.FC = () => {
  const [posts, loading, nextPage, hasMore, , error] = usePagedQuery<IPost>(
    useCallback(db => db.collection('posts').orderBy('createdAt', 'desc'), [])
  )

  useNotifyError(error)

  const observe = useObserver<HTMLDivElement>(nextPage, hasMore && !loading)

  return (
    <Wrapper>
      <PostsContainer>
        {posts.map(x => (
          <FeedPost post={x} key={x.id} />
        ))}

        {loading && <LoadingRow />}

        <BottomDiv ref={observe} />
      </PostsContainer>
    </Wrapper>
  )
}

export default Feed
