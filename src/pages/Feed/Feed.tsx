import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { IPost } from '../../domain'
import FeedPost from '../../components/Post/FeedPost'
import LoadingRow from '../../components/Loaders/LoadingRow'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { useNotifyError, useObserver, usePagedQuery, useScroll } from '../../hooks'
import { ChevronUpIcon } from '../../components/Icons'
import PostDetail from '../../components/Post/Detail/PostDetail'
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

const Feed: React.FC = () => {
  const [posts, loading, nextPage, hasMore, , error, modifyPost] = usePagedQuery<IPost>(
    useCallback(db => db.collection('posts').orderBy('createdAt', 'desc'), [])
  )

  useNotifyError(error)
  const history = useHistory()
  const [selectedPostId, setSelectedPostId] = useState<string>()
  const [topRef, scrollUp] = useScroll()
  const { currentUser } = useAuthorizedUser()
  const observe = useObserver<HTMLDivElement>(nextPage, hasMore && !loading)

  // REMOVE GET POST BY ID -> replace selectedPostId with selectedPost
  const getPostById = (id: string) => posts.find(x => x.id === id)!

  const handleLikeClicked = async (post: IPost) => {
    const { nick } = currentUser
    await likePost(post, nick)

    const newLikes = isLiked(post, nick)
      ? post.likes.filter(x => x !== nick)
      : [...post.likes, nick]

    modifyPost({ ...post, likes: newLikes })
  }

  return (
    <>
      {selectedPostId && (
        <PostDetail
          post={getPostById(selectedPostId)}
          onClose={() => setSelectedPostId(undefined)}
          isLiked={isLiked(getPostById(selectedPostId), currentUser.nick)}
          onLike={() => handleLikeClicked(getPostById(selectedPostId))}
          canDelete={false}
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
              onOpenDetail={setSelectedPostId}
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
