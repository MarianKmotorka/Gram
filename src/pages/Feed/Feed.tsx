import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { IPost } from '../../domain'
import FeedPost from '../../components/Post/FeedPost'
import LoadingRow from '../../components/Loaders/LoadingRow'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { FieldValue, projectFirestore } from '../../firebase/firebaseConfig'
import { useNotifyError, useObserver, usePagedQuery, useScroll } from '../../hooks'
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
import { ChevronUpIcon } from '../../components/Icons'
import PostDetail from '../../components/Post/Detail/PostDetail'
import { isLiked } from '../../utils/postUtils'

const Feed: React.FC = () => {
  const [posts, loading, nextPage, hasMore, , error, modifyPost] = usePagedQuery<IPost>(
    useCallback(db => db.collection('posts').orderBy('createdAt', 'desc'), [])
  )

  useNotifyError(error)
  const history = useHistory()
  const [postDetailId, setPostDetailId] = useState<string>()
  const [topRef, scrollUp] = useScroll()
  const { currentUser } = useAuthContext()
  const observe = useObserver<HTMLDivElement>(nextPage, hasMore && !loading)

  const getPostById = (id: string) => posts.find(x => x.id === id)!

  const handleLikeClicked = async (post: IPost) => {
    const { arrayUnion, arrayRemove } = FieldValue
    const { nick } = currentUser!
    const liked = isLiked(post, nick)
    const arrayOperation = liked ? arrayRemove : arrayUnion

    await projectFirestore.doc(`posts/${post.id}`).update({ likes: arrayOperation(nick) })
    const newLikes = liked ? post.likes.filter(x => x !== nick) : [...post.likes, nick]
    modifyPost({ ...post, likes: newLikes })
  }

  return (
    <>
      {postDetailId && (
        <PostDetail
          post={getPostById(postDetailId)}
          onClose={() => setPostDetailId(undefined)}
          isLiked={isLiked(getPostById(postDetailId), currentUser!.nick)}
          onLike={() => handleLikeClicked(getPostById(postDetailId))}
        />
      )}

      <Wrapper>
        <SideCard>
          <CardTop />
          <CardMiddle>
            <ProfilePhoto
              src={currentUser?.photoUrl || noPhoto}
              onClick={() => history.push(`/profile/${currentUser?.id}`)}
            />
            <Nick>{currentUser?.nick}</Nick>
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
            {currentUser?.postCount}
          </Stat>
        </SideCard>

        <PostsContainer>
          <DummymSpan ref={topRef} />
          {posts.map(x => (
            <FeedPost
              post={x}
              key={x.id}
              onLikeClick={handleLikeClicked}
              onOpenDetail={setPostDetailId}
              isLiked={isLiked(x, currentUser!.nick)}
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
