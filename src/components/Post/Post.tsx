import moment from 'moment'
import React, { useRef, useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { IPost } from '../../domain/IPost'
import Backdrop, { IBackdropProps } from '../Backdrop'
import Button from '../Button/Button'

import noPhotoPng from '../../images/no-photo.png'
import {
  ActionBar,
  AuthorContainer,
  AuthorNick,
  AuthorPicture,
  CreatedAt,
  Description,
  Header,
  Image,
  ImageContainer,
  ShowMore,
  Wrapper,
} from './Post.styled'

interface IPostProps {
  post: IPost
  canDelete: boolean
  onDelete: (post: IPost) => Promise<void>
  onClose: Required<IBackdropProps>['onClose']
}

const Post: React.FC<IPostProps> = ({ post, canDelete, onClose, onDelete }) => {
  const [showDescription, setShowDescription] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const { width } = useDimensions<HTMLDivElement>({ ref: imageRef })

  const createdAt = moment(post.createdAt.toDate()).format('MMMM Do YYYY')

  const handleDelete = async () => {
    setDeleteLoading(true)
    await onDelete(post)
  }

  return (
    <Backdrop onClose={onClose}>
      <Wrapper initial={{ y: '50vh' }} animate={{ y: 0 }}>
        <Header>
          <h2>{post.title}</h2>
          <CreatedAt>
            <i className='far fa-clock'></i>
            {createdAt}
          </CreatedAt>

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

        <ImageContainer ref={imageRef}>
          <Image src={post.imageUrl} />
        </ImageContainer>

        <ActionBar>
          <AuthorContainer>
            <AuthorPicture src={post.userPhotoUrl || noPhotoPng} />
            <AuthorNick>{post.userNick}</AuthorNick>
          </AuthorContainer>

          <Button buttonType='action' iconName='far fa-heart' />
          <Button buttonType='action' iconName='fas fa-comment-dots' />
          {canDelete && (
            <Button
              buttonType='action'
              primaryColor='red'
              iconName='far fa-trash-alt'
              isLoading={deleteLoading}
              onClick={handleDelete}
            />
          )}
        </ActionBar>
      </Wrapper>
    </Backdrop>
  )
}

export default Post
