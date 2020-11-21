import React, { FC } from 'react'
import moment from 'moment'

import { IPost } from '../../../../domain'
import Button from '../../../Button/Button'
import { ClockIcon } from '../../../Icons'
import noPhoto from '../../../../images/no-photo.png'

import {
  AuthorInfo,
  AuthorName,
  AuthorSection,
  Text,
  Title,
  Wrapper,
} from './PostInfo.styled'

interface IPostInfoProps {
  post: IPost
  isFollowed: boolean
  canFollow: boolean
  onFollow: () => Promise<void>
}

const PostInfo: FC<IPostInfoProps> = ({ post, isFollowed, canFollow, onFollow }) => {
  const createdAt = moment(post.createdAt.toDate()).fromNow()

  return (
    <Wrapper>
      <AuthorSection>
        <img src={post.userPhotoUrl || noPhoto} alt='author' />

        <AuthorInfo>
          <AuthorName to={`/profile/${post.userId}`}>{post.userNick}</AuthorName>
          <p>
            <ClockIcon />
            {createdAt}
          </p>
        </AuthorInfo>

        {canFollow && (
          <Button
            color='accent'
            scale={0.8}
            hover={false}
            reversed={isFollowed}
            right='0'
            onClick={onFollow}
          >
            {isFollowed ? 'Followed' : 'Follow'}
          </Button>
        )}
      </AuthorSection>

      <Title>{post.title}</Title>

      <Text>{post.description}</Text>
    </Wrapper>
  )
}

export default PostInfo
