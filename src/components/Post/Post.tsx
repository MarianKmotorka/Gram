import moment from 'moment'
import React, { useState } from 'react'
import { IPost } from '../../domain/Post'
import Backdrop, { IBackdropProps } from '../Backdrop'
import Button from '../Button/Button'

import { ActionBar, Header, Image, Wrapper } from './Post.styled'

interface IPostProps {
  post: IPost
  onDelete: (post: IPost) => Promise<void>
  onClose: Required<IBackdropProps>['onClose']
}

const Post: React.FC<IPostProps> = ({ post, onClose, onDelete }) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const createdAt = moment(post.createdAt.toDate()).format('MMMM Do YYYY')

  const handleDelete = async () => {
    setDeleteLoading(true)
    await onDelete(post)
  }

  return (
    <Backdrop onClose={onClose}>
      <Wrapper initial={{ y: '50vh' }} animate={{ y: 0 }}>
        <Header>
          <h3>{post.title}</h3>
          <p>{createdAt}</p>
          <Button buttonType='action' onClick={onClose} iconName='fas fa-times' />
        </Header>

        <Image src={post.imageUrl} />

        <ActionBar>
          <Button buttonType='action' iconName='far fa-heart' />
          <Button buttonType='action' iconName='fas fa-comment-dots' />
          <Button
            buttonType='action'
            color='red'
            iconName='far fa-trash-alt'
            isLoading={deleteLoading}
            onClick={handleDelete}
          />
        </ActionBar>
      </Wrapper>
    </Backdrop>
  )
}

export default Post
