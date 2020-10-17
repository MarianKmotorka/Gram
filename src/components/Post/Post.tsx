import moment from 'moment'
import React from 'react'
import { IPost } from '../../domain/Post'
import Backdrop, { IBackdropProps } from '../Backdrop'

import { ActionBar, ActionBtn, Header, Image, Wrapper } from './Post.styled'

interface IPostProps {
  post: IPost
  onDelete: (post: IPost) => Promise<void>
  onClose: Required<IBackdropProps>['onClose']
}

const Post: React.FC<IPostProps> = ({ post, onClose, onDelete }) => {
  const createdAt = moment(post.createdAt.toDate()).format('MMMM Do YYYY')

  return (
    <Backdrop onClose={onClose}>
      <Wrapper initial={{ y: '50vh' }} animate={{ y: 0 }}>
        <Header>
          <h3>Some title text :)))</h3>
          <p>{createdAt}</p>
          <ActionBtn onClick={onClose}>
            <i className='fas fa-times'></i>
          </ActionBtn>
        </Header>

        <Image src={post.imageUrl} />

        <ActionBar>
          <ActionBtn>
            <i className='far fa-heart'></i>
          </ActionBtn>

          <ActionBtn>
            <i className='fas fa-comment-dots'></i>
          </ActionBtn>

          <ActionBtn color='red' onClick={async () => await onDelete(post)}>
            <i className='far fa-trash-alt'></i>
          </ActionBtn>
        </ActionBar>
      </Wrapper>
    </Backdrop>
  )
}

export default Post
