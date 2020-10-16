import React from 'react'
import { IPost } from '../../domain/Post'
import Backdrop, { IBackdropProps } from '../Backdrop'

import { Footer, Header, Image, Wrapper } from './Post.styled'

interface IPostProps {
  post: IPost
  onClose: Required<IBackdropProps>['onClose']
}

const Post: React.FC<IPostProps> = ({ post, onClose }) => {
  return (
    <Backdrop onClose={onClose}>
      <Wrapper initial={{ y: '50vh' }} animate={{ y: 0 }}>
        <Header>Some title text :)))</Header>
        <Image src={post.imageUrl} />
        <Footer>Some footer text</Footer>
      </Wrapper>
    </Backdrop>
  )
}

export default Post
