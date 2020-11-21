import React, { useCallback, useState } from 'react'

import { FeedType, getPostsQuery, isFollowed } from './utils'
import TopMenu from './TopMenu/TopMenu'
import { IFollow, IPost } from '../../domain'
import { ChevronUpIcon } from '../../components/Icons'
import { LoadingRow, FeedPost } from '../../components'
import PostDetailPage from '../PostDetailPage/PostDetailPage'
import SideCard, { SideCardPlaceHolder } from './SideCard/SideCard'
import { useApiError } from '../../contextProviders/ApiErrorProvider'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { follow, isLiked, likePost, unfollow } from '../../services/postService'
import {
  useFirestoreQuery,
  useLocalStorage,
  useNotifyError,
  useObserver,
  usePagedQuery,
  useScroll,
} from '../../hooks'

import { DummymSpan, PostsContainer, Wrapper, ScrollUpButton } from './Feed.styled'

const Feed: React.FC = () => {
  const { currentUser } = useAuthorizedUser()
  const [feedType, setFeedType] = useLocalStorage<FeedType>('feedTopMenu.feedType', 'all')
  const [selectedPost, setSelectedPost] = useState<IPost>()

  const [followings, followingsLoading, followingsError] = useFirestoreQuery<IFollow>(
    useCallback(x => x.collection(`users/${currentUser.id}/followings`), [currentUser.id])
  )

  const [posts, postsLoading, nextPage, hasMore, , postsErr, modifyPost] = usePagedQuery<
    IPost
  >(
    useCallback(
      getPostsQuery(
        feedType === 'all',
        followings.map(x => x.userId)
      ),
      [feedType]
    ),
    { startFetching: !followingsLoading }
  )

  useNotifyError(postsErr)
  useNotifyError(followingsError)
  const { setError } = useApiError()

  const [topRef, scrollUp] = useScroll<HTMLDivElement>()
  const observe = useObserver<HTMLDivElement>(nextPage, hasMore && !postsLoading)

  const updateLikeCount = (post: IPost) => {
    const newLikes = isLiked(post, currentUser.nick)
      ? post.likes.filter(x => x !== currentUser.nick)
      : [...post.likes, currentUser.nick]

    modifyPost({ ...post, likes: newLikes })
  }

  const handleLikeClicked = async (post: IPost) => {
    await likePost(post, currentUser.nick)
    updateLikeCount(post)
  }

  const handleFollowClicked = async (post: IPost) => {
    const { id } = currentUser
    if (isFollowed(followings, post.userId)) await unfollow(id, post.userId, setError)
    else await follow(id, { userId: post.userId, userNick: post.userNick }, setError)
  }

  return (
    <>
      {selectedPost && (
        <PostDetailPage
          canDelete={false}
          postId={selectedPost.id}
          onClose={() => setSelectedPost(undefined)}
          isFollowed={isFollowed(followings, selectedPost.userId)}
          afterLikedCallback={() => updateLikeCount(selectedPost)}
          onFollow={
            currentUser.id === selectedPost.userId
              ? undefined
              : async () => await handleFollowClicked(selectedPost)
          }
        />
      )}

      <Wrapper>
        <SideCard currentUser={currentUser} followingCount={followings.length} />

        <PostsContainer>
          <TopMenu feedType={feedType} forwardRef={topRef} onChange={setFeedType} />

          {posts.map(x => (
            <FeedPost
              post={x}
              key={x.id}
              onLikeClick={handleLikeClicked}
              onOpenDetail={setSelectedPost}
              isMyPost={x.userId === currentUser.id}
              isLiked={isLiked(x, currentUser.nick)}
              isFollowed={isFollowed(followings, x.userId)}
              onFollowClick={async () => await handleFollowClicked(x)}
            />
          ))}

          {(postsLoading || followingsLoading) && <LoadingRow />}

          <ScrollUpButton color='accent' onClick={scrollUp}>
            <ChevronUpIcon />
          </ScrollUpButton>

          <DummymSpan ref={observe} />
        </PostsContainer>

        <SideCardPlaceHolder />
      </Wrapper>
    </>
  )
}

export default Feed
