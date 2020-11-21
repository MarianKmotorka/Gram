import React from 'react'
import moment from 'moment'

import { IPost } from '../../domain'
import noPhotoPng from '../../images/no-photo.png'
import { ClockIcon, HeartFilledIcon, HeartIcon } from '../Icons'

import {
  AuthorInfo,
  AuthorSection,
  Body,
  Header,
  Title,
  Wrapper,
  AuthorName,
  CardButton,
  StyledButton,
} from './FeedPost.styled'

interface IFeedPostProps {
  post: IPost
  isLiked: boolean
  isFollowed: boolean
  canFollow: boolean
  onLikeClick: (post: IPost) => Promise<void>
  onOpenDetail: (postId: IPost) => void
  onFollowClick: () => Promise<void>
}

const FeedPost: React.FC<IFeedPostProps> = ({
  post,
  isLiked,
  canFollow,
  isFollowed,
  onLikeClick,
  onOpenDetail,
  onFollowClick,
}) => {
  const createdAt = moment(post.createdAt.toDate()).fromNow()

  return (
    <Wrapper>
      <Header>
        <AuthorSection>
          {canFollow && (
            <StyledButton
              color='accent'
              reversed={isFollowed}
              onClick={onFollowClick}
              hover={false}
            >
              {isFollowed ? 'Followed' : 'Follow'}
            </StyledButton>
          )}

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
        <img src={post.imageUrl} alt='post' onClick={() => onOpenDetail(post)} />

        <CardButton onClick={async () => await onLikeClick(post)}>
          {isLiked ? <HeartFilledIcon color='red' /> : <HeartIcon />}
          <span>{post.likes ? post.likes.length : 0}</span>
        </CardButton>
      </Body>
    </Wrapper>
  )
}

export default FeedPost
