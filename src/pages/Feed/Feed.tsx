import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { IPost } from '../../domain'
import TopMenu from './TopMenu/TopMenu'
import { propertyOf } from '../../utils'
import { FeedFilter, getPostsQuery } from './utils'
import { ChevronUpIcon } from '../../components/Icons'
import { LoadingRow, FeedPost } from '../../components'
import PostDetailPage from '../PostDetailPage/PostDetailPage'
import { isLiked, likePost } from '../../services/postService'
import SideCard, { SideCardPlaceHolder } from './SideCard/SideCard'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import FollowersProvider, { useFollowers } from '../../contextProviders/FollowersProvider'
import {
  useLocalStorage,
  useNotifyError,
  useObserver,
  usePagedQuery,
  useScroll,
  useUrlQueryParams,
} from '../../hooks'

import { DummymSpan, PostsContainer, Wrapper, ScrollUpButton } from './Feed.styled'

const Feed: React.FC = () => {
  const history = useHistory()
  const { currentUser } = useAuthorizedUser()
  const { postId: selectedPostId } = useUrlQueryParams()
  const [feedFilter, setFeedFilter] = useLocalStorage<FeedFilter>('feed-filter', 'all')
  const { followings, followingsLoading, isFollowedByMe, handleFollowed } = useFollowers()
  const [posts, postsLoading, nextPage, hasMore, , postsErr, modifyPost] = usePagedQuery<
    IPost
  >(
    useCallback(
      getPostsQuery(
        feedFilter,
        followings.map(x => x.userId),
        currentUser.id
      ),
      [feedFilter, followingsLoading]
    ),
    { startFetching: !followingsLoading }
  )

  useNotifyError(postsErr)

  const [topRef, scrollUp] = useScroll<HTMLDivElement>()
  const observe = useObserver<HTMLDivElement>(nextPage, hasMore && !postsLoading)

  const updateLikeCount = (post?: IPost) => {
    if (post === undefined) return

    const newLikes = isLiked(post, currentUser.nick)
      ? post.likes.filter(x => x !== currentUser.nick)
      : [...post.likes, currentUser.nick]

    modifyPost({ ...post, [propertyOf<IPost>('likes')]: newLikes })
  }

  const handleLikeClicked = async (post: IPost) => {
    await likePost(post, currentUser.nick)
    updateLikeCount(post)
  }

  const updateCommentCount = (commentAdded: boolean, post?: IPost) => {
    if (post === undefined) return

    const currCount = post.commentCount || 0
    const newCount = commentAdded ? currCount + 1 : currCount - 1

    modifyPost({ ...post, [propertyOf<IPost>('commentCount')]: newCount })
  }

  return (
    <>
      {selectedPostId && (
        <PostDetailPage
          deleteDisabled
          postId={selectedPostId as string}
          onClose={() => history.push('/feed')}
          afterLikedCallback={() =>
            updateLikeCount(posts.find(x => x.id === selectedPostId))
          }
          afterCommentAddedOrDeletedCallback={added =>
            updateCommentCount(
              added,
              posts.find(x => x.id === selectedPostId)
            )
          }
        />
      )}

      <Wrapper>
        <SideCard />

        <PostsContainer>
          <div ref={topRef}/>
          
          <TopMenu feedType={feedFilter} onChange={setFeedFilter} />

          {posts.map(x => (
            <FeedPost
              post={x}
              key={x.id}
              canFollow={x.userId !== currentUser.id}
              isLiked={isLiked(x, currentUser.nick)}
              isFollowed={isFollowedByMe(x.userId)}
              onLikeClick={handleLikeClicked}
              onOpenDetail={tabKey =>
                history.push(
                  `/feed?postId=${x.id}${tabKey ? `&initialTabKey=${tabKey}` : ''}`
                )
              }
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
