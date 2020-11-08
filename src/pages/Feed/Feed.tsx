import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { IPost } from '../../domain'
import FeedPost from '../../components/Post/FeedPost'
import LoadingRow from '../../components/Loaders/LoadingRow'
import { useAuthContext } from '../../contextProviders/AuthProvider'
import { FieldValue, projectFirestore } from '../../config/firebaseConfig'
import { useNotifyError, useObserver, usePagedQuery } from '../../hooks'
import noPhoto from '../../images/no-photo.png'

import {
  Stat,
  BottomDiv,
  CardSeparator,
  CardTop,
  Nick,
  PostsContainer,
  ProfilePhoto,
  SideCard,
  Wrapper,
} from './Feed.styled'

const Feed: React.FC = () => {
  const [posts, loading, nextPage, hasMore, , error, modifyPost] = usePagedQuery<IPost>(
    useCallback(db => db.collection('posts').orderBy('createdAt', 'desc'), [])
  )

  useNotifyError(error)
  const history = useHistory()
  const observe = useObserver<HTMLDivElement>(nextPage, hasMore && !loading)
  const { currentUser } = useAuthContext()

  const handleLikeClicked = async (post: IPost) => {
    const { arrayUnion, arrayRemove } = FieldValue
    const likes = post.likes || []
    const isLiked = likes.includes(currentUser!.nick) || false
    const arrayOperation = isLiked ? arrayRemove : arrayUnion

    await projectFirestore
      .doc(`posts/${post.id}`)
      .update({ likes: arrayOperation(currentUser!.nick) })

    const newLikes = isLiked
      ? likes.filter(x => x !== currentUser!.nick)
      : [...likes, currentUser!.nick]

    modifyPost({ ...post, likes: newLikes })
  }

  return (
    <Wrapper>
      <SideCard>
        <CardTop />
        <ProfilePhoto
          src={currentUser?.photoUrl || noPhoto}
          onClick={() => history.push(`/profile/${currentUser?.id}`)}
        />
        <Nick>{currentUser?.nick}</Nick>

        <CardSeparator />

        <Stat>
          <b>followed by:</b>-
        </Stat>
        <Stat>
          <b>following:</b>-
        </Stat>
        <Stat>
          <b>#posts:</b>-
        </Stat>
      </SideCard>

      <PostsContainer>
        {posts.map(x => (
          <FeedPost
            post={x}
            key={x.id}
            onLikeClick={handleLikeClicked}
            isLiked={x.likes?.includes(currentUser!.nick) || false}
          />
        ))}

        {loading && <LoadingRow />}

        <BottomDiv ref={observe} />
      </PostsContainer>
    </Wrapper>
  )
}

export default Feed
