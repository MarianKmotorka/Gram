import React, { FC } from 'react'
import moment from 'moment'

import { IPost } from '../../../../domain'
import noPhoto from '../../../../images/no-photo.png'
import { ClockIcon } from '../../../Icons'

import {
  AuthorInfo,
  AuthorName,
  AuthorSection,
  Text,
  Title,
  Wrapper,
} from './PostInfo.styled'
import Button from '../../../Button/Button'

interface IPostInfoProps {
  post: IPost
  isFollowed?: boolean
  onFollow?: () => Promise<void>
}

const PostInfo: FC<IPostInfoProps> = ({ post, isFollowed, onFollow }) => {
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

        {onFollow && (
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
