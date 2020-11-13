import React from 'react'
import moment from 'moment'

import { IPost } from '../../domain'
import noPhotoPng from '../../images/no-photo.png'
import { ClockIcon, HeartFilledIcon, HeartIcon, ExpandIcon } from '../Icons'

import {
  AuthorInfo,
  AuthorSection,
  Body,
  Header,
  Title,
  Wrapper,
  AuthorName,
  StyledIconButton,
  CardButton,
} from './FeedPost.styled'

interface IFeedPostProps {
  post: IPost
  isLiked: boolean
  onLikeClick: (post: IPost) => Promise<void>
  onOpenDetail: (postId: string) => void
}

const FeedPost: React.FC<IFeedPostProps> = ({
  post,
  isLiked,
  onLikeClick,
  onOpenDetail,
}) => {
  const createdAt = moment(post.createdAt.toDate()).fromNow()

  return (
    <Wrapper>
      <Header>
        <AuthorSection>
          <StyledIconButton
            onClick={() => onOpenDetail(post.id)}
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

      <Body>
        <img src={post.imageUrl} alt='post' onClick={() => onOpenDetail(post.id)} />

        <CardButton onClick={async () => await onLikeClick(post)}>
          {isLiked ? <HeartFilledIcon color='accent' /> : <HeartIcon />}
          <span>{post.likes ? post.likes.length : 0}</span>
        </CardButton>
      </Body>
    </Wrapper>
  )
}

export default FeedPost
