import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'

import { IPost } from '../../domain'
import noPhotoPng from '../../images/no-photo.png'
import { ClockIcon, HeartFilledIcon, HeartIcon, ExpandIcon } from '../Icons'

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
  StyledIconButton,
  CardButton,
} from './FeedPost.styled'

interface IFeedPostProps {
  post: IPost
  isLiked: boolean
  onLikeClick: (post: IPost) => Promise<void>
  onOpenDetail: (post: IPost) => void
}

const FeedPost: React.FC<IFeedPostProps> = ({
  post,
  isLiked,
  onLikeClick,
  onOpenDetail,
}) => {
  const [showMore, setShowMore] = useState(false)
  const createdAt = moment(post.createdAt.toDate()).fromNow()

  return (
    <Wrapper>
      <Header>
        <AuthorSection>
          <StyledIconButton
            onClick={() => onOpenDetail(post)}
            icon={<ExpandIcon color='black' />}
            top='10px'
            right='10px'
          />
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

      <Body>
        <img src={post.imageUrl} alt='post' onClick={() => onOpenDetail(post)} />

        <ActionBar>
          <CardButton onClick={async () => await onLikeClick(post)}>
            {isLiked ? <HeartFilledIcon color='accent' /> : <HeartIcon />}
            <span>{post.likes ? post.likes.length : 0}</span>
          </CardButton>
        </ActionBar>
      </Body>
    </Wrapper>
  )
}

export default FeedPost
