import React, { useCallback, useState } from 'react'

import TopMenu from './TopMenu/TopMenu'
import { IPost } from '../../domain'
import { FeedFilter, getPostsQuery } from './utils'
import { ChevronUpIcon } from '../../components/Icons'
import { LoadingRow, FeedPost } from '../../components'
import PostDetailPage from '../PostDetailPage/PostDetailPage'
import SideCard, { SideCardPlaceHolder } from './SideCard/SideCard'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { isLiked, likePost } from '../../services/postService'
import FollowersProvider, { useFollowers } from '../../contextProviders/FollowersProvider'
import {
  useLocalStorage,
  useNotifyError,
  useObserver,
  usePagedQuery,
  useScroll,
} from '../../hooks'

import { DummymSpan, PostsContainer, Wrapper, ScrollUpButton } from './Feed.styled'

const Feed: React.FC = () => {
  const { currentUser } = useAuthorizedUser()
  const [feedFilter, setFeedFilter] = useLocalStorage<FeedFilter>('feed-filter', 'all')
  const [selectedPost, setSelectedPost] = useState<IPost>()
  const {
    followings,
    followedByCount,
    loading: followingsLoading,
    isFollowedByMe,
    handleFollowed,
  } = useFollowers()

  const [posts, postsLoading, nextPage, hasMore, , postsErr, modifyPost] = usePagedQuery<
    IPost
  >(
    useCallback(
      getPostsQuery(
        feedFilter,
        followings.map(x => x.userId),
        currentUser.id
      ),
      [feedFilter, followings]
    ),
    { startFetching: !followingsLoading }
  )

  useNotifyError(postsErr)

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

  return (
    <>
      {selectedPost && (
        <PostDetailPage
          canDelete={false}
          postId={selectedPost.id}
          onClose={() => setSelectedPost(undefined)}
          isFollowed={isFollowedByMe(selectedPost.userId)}
          canFollow={selectedPost.userId !== currentUser.id}
          afterLikedCallback={() => updateLikeCount(selectedPost)}
          onFollow={async () =>
            await handleFollowed(selectedPost.userId, selectedPost.userNick)
          }
        />
      )}

      <Wrapper>
        <SideCard
          currentUser={currentUser}
          followingCount={followings.length}
          followedByCount={followedByCount}
        />

        <PostsContainer>
          <TopMenu feedType={feedFilter} forwardRef={topRef} onChange={setFeedFilter} />

          {posts.map(x => (
            <FeedPost
              post={x}
              key={x.id}
              onLikeClick={handleLikeClicked}
              onOpenDetail={setSelectedPost}
              canFollow={x.userId !== currentUser.id}
              isLiked={isLiked(x, currentUser.nick)}
              isFollowed={isFollowedByMe(x.userId)}
              onFollowClick={async () => await handleFollowed(x.userId, x.userNick)}
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

export default () => (
  <FollowersProvider>
    <Feed />
  </FollowersProvider>
)
