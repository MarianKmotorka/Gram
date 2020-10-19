import moment from 'moment'
import React, { useRef, useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { IPost } from '../../domain/Post'
import Backdrop, { IBackdropProps } from '../Backdrop'
import Button from '../Button/Button'

import { ActionBar, Description, Header, Image, ShowMore, Wrapper } from './Post.styled'

interface IPostProps {
  post: IPost
  onDelete: (post: IPost) => Promise<void>
  onClose: Required<IBackdropProps>['onClose']
}

const Post: React.FC<IPostProps> = ({ post, onClose, onDelete }) => {
  const [showDescription, setShowDescription] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const { width } = useDimensions<HTMLImageElement>({ ref: imageRef })

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

          {post.description && (
            <ShowMore onClick={() => setShowDescription(x => !x)}>
              {showDescription ? 'show less' : 'show more'}
            </ShowMore>
          )}

          <Button buttonType='action' onClick={onClose} iconName='fas fa-times' />
        </Header>

        {showDescription && (
          <Description initial={{ height: 0 }} animate={{ height: 'auto' }} width={width}>
            {post.description}
          </Description>
        )}

        <Image src={post.imageUrl} ref={imageRef} />

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
