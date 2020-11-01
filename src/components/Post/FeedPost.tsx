import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'

import { IPost } from '../../domain'
import Button from '../Button/Button'
import noPhotoPng from '../../images/no-photo.png'
import { ClockIcon, CommentsIcon, HeartIcon } from '../Icons'

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
}

const FeedPost: React.FC<IFeedPostProps> = ({ post }) => {
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
        <Button buttonType='action' icon={<HeartIcon />} />
        <Button buttonType='action' icon={<CommentsIcon />} />
      </ActionBar>
    </Wrapper>
  )
}

export default FeedPost