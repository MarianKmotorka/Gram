import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'

import { IPost } from '../../domain'
import noPhotoPng from '../../images/no-photo.png'
import { ClockIcon, CommentsIcon, HeartFilledIcon, HeartIcon } from '../Icons'

import {
  AuthorInfo,
  AuthorSection,
  Body,
  Description,
  Header,
  Title,
  ShowMore,
  Wrapper,
  AuthorName,
  ActionBar,
} from './FeedPost.styled'

interface IFeedPostProps {
  post: IPost
  isLiked: boolean
  onLikeClick: (post: IPost) => Promise<void>
}

const FeedPost: React.FC<IFeedPostProps> = ({ post, onLikeClick, isLiked }) => {
  const [showMore, setShowMore] = useState(false)

  const createdAt = moment(post.createdAt.toDate()).fromNow()

  return (
    <Wrapper>
      <Header>
        <AuthorSection>
          <img src={post.userPhotoUrl || noPhotoPng} alt='author' />

          <AuthorInfo>
            <AuthorName to={`/profile/${post.userId}`}>{post.userNick}</AuthorName>
            <p>
              <ClockIcon />
              {createdAt}
            </p>
          </AuthorInfo>
        </AuthorSection>

        <Title>{post.title}</Title>
      </Header>

      <Body>
        {post.description && (
          <ShowMore onClick={() => setShowMore(x => !x)}>
            {showMore ? 'show less' : 'show more'}
          </ShowMore>
        )}

        <AnimatePresence>
          {showMore && (
            <Description
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {post.description}
            </Description>
          )}
        </AnimatePresence>
        <img src={post.imageUrl} alt='post' />
      </Body>

      <ActionBar>
        <button onClick={async () => await onLikeClick(post)}>
          {isLiked ? <HeartFilledIcon color='accent' /> : <HeartIcon />}
          <span>{post.likes ? post.likes.length : 0}</span>
        </button>

        <button>
          <CommentsIcon />
          <span>-1</span>
        </button>
      </ActionBar>
    </Wrapper>
  )
}

export default FeedPost
