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

interface IPostInfoProps {
  post: IPost
}

const PostInfo: FC<IPostInfoProps> = ({ post }) => {
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
      </AuthorSection>

      <Title>{post.title}</Title>

      <Text>{post.description}</Text>
    </Wrapper>
  )
}

export default PostInfo
