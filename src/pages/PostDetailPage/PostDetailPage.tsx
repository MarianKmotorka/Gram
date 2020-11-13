import React, { FC } from 'react'

import { Wrapper } from './PostDetailPage.styled'

interface IPostDetailPageProps {
  postId: string
}

const PostDetailPage: FC<IPostDetailPageProps> = ({ postId }) => {
  return <Wrapper></Wrapper>
}

export default PostDetailPage
