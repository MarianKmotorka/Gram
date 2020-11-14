import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { IPost } from '../../domain'
import FeedPost from '../../components/Post/FeedPost'
import LoadingRow from '../../components/Loaders/LoadingRow'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { useNotifyError, useObserver, usePagedQuery, useScroll } from '../../hooks'
import { ChevronUpIcon } from '../../components/Icons'
import { isLiked, likePost } from '../../services/postService'
import noPhoto from '../../images/no-photo.png'

import {
  Stat,
  DummymSpan,
  CardSeparator,
  CardTop,
  Nick,
  PostsContainer,
  ProfilePhoto,
  SideCard,
  Wrapper,
  ScrollUpButton,
  CardMiddle,
} from './Feed.styled'
import PostDetailPage from '../PostDetailPage/PostDetailPage'

const Feed: React.FC = () => {
  const [posts, loading, nextPage, hasMore, , error, modifyPost] = usePagedQuery<IPost>(
    useCallback(db => db.collection('posts').orderBy('createdAt', 'desc'), [])
  )
  useNotifyError(error)
  const history = useHistory()
  const [topRef, scrollUp] = useScroll()
  const { currentUser } = useAuthorizedUser()
  const [selectedPost, setSelectedPost] = useState<IPost>()
  const observe = useObserver<HTMLDivElement>(nextPage, hasMore && !loading)

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
          postId={selectedPost.id}
          onClose={() => setSelectedPost(undefined)}
          canDelete={false}
          afterLikedCallback={() => updateLikeCount(selectedPost)}
        />
      )}

      <Wrapper>
        <SideCard>
          <CardTop />
          <CardMiddle>
            <ProfilePhoto
              src={currentUser.photoUrl || noPhoto}
              onClick={() => history.push(`/profile/${currentUser.id}`)}
            />
            <Nick>{currentUser.nick}</Nick>
          </CardMiddle>

          <CardSeparator />

          <Stat>
            <b>followed by:</b>0
          </Stat>
          <Stat>
            <b>following:</b>0
          </Stat>
          <Stat>
            <b>#posts:</b>
            {currentUser.postCount}
          </Stat>
        </SideCard>

        <PostsContainer>
          <DummymSpan ref={topRef} />
          {posts.map(x => (
            <FeedPost
              post={x}
              key={x.id}
              onLikeClick={handleLikeClicked}
              onOpenDetail={setSelectedPost}
              isLiked={isLiked(x, currentUser.nick)}
            />
          ))}

          {loading && <LoadingRow />}

          <ScrollUpButton reversed onClick={scrollUp}>
            <ChevronUpIcon />
          </ScrollUpButton>

          <DummymSpan ref={observe} />
        </PostsContainer>

        <SideCard visibility='hidden'></SideCard>
      </Wrapper>
    </>
  )
}

export default Feed
