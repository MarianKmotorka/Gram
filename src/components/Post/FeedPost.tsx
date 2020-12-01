import React from 'react'
import moment from 'moment'

import { IPost } from '../../domain'
import IconButton from '../Button/IconButton'
import noPhotoPng from '../../images/no-photo.png'
import { PostDetailTabs } from './Detail/PostDetail'
import { ClockIcon, CommentsIcon, ExpandIcon, HeartFilledIcon, HeartIcon } from '../Icons'

import {
  AuthorInfo,
  AuthorSection,
  Body,
  Header,
  Title,
  Wrapper,
  AuthorName,
  CardButton,
  FollowButton,
  ButtonsContainer,
} from './FeedPost.styled'

interface IFeedPostProps {
  post: IPost
  isLiked: boolean
  isFollowed: boolean
  canFollow: boolean
  onLikeClick: (post: IPost) => Promise<void>
  onOpenDetail: (tabKey?: PostDetailTabs) => void
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
  const isImage = post.mediaType.startsWith('image')

  return (
    <Wrapper>
      <Header>
        <AuthorSection>
          {canFollow && (
            <FollowButton
              color='accent'
              reversed={isFollowed}
              onClick={onFollowClick}
              hover={false}
            >
              {isFollowed ? 'Followed' : 'Follow'}
            </FollowButton>
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

        <IconButton
          top='10px'
          right='10px'
          scale={0.9}
          bg='transparent'
          icon={<ExpandIcon color='accent' />}
          onClick={() => onOpenDetail()}
        />
      </Header>

      <Body>
        {isImage ? (
          <img src={post.mediaUrl} alt='post' onClick={() => onOpenDetail()} />
        ) : (
          <video src={post.mediaUrl} controls />
        )}

        <ButtonsContainer bottom={isImage ? '25px' : '70px'}>
          <CardButton onClick={async () => await onLikeClick(post)}>
            {isLiked ? <HeartFilledIcon color='red' /> : <HeartIcon />}
            <span>{post.likes ? post.likes.length : 0}</span>
          </CardButton>

          <CardButton onClick={() => onOpenDetail('comments')}>
            <CommentsIcon />
            <span>{post.commentCount || 0}</span>
          </CardButton>
        </ButtonsContainer>
      </Body>
    </Wrapper>
  )
}

export default FeedPost
