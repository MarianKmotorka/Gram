import React, { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import useDimensions from 'react-cool-dimensions'
import moment from 'moment'

import { IPost } from '../../domain'
import Button from '../Button/Button'
import noPhotoPng from '../../images/no-photo.png'
import Backdrop, { IBackdropProps } from '../Backdrop'
import { ClockIcon, CloseIcon, CommentsIcon, HeartIcon, TrashIcon } from '../Icons'

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
      <Wrapper initial={{ y: '50vh' }} animate={{ y: 0 }} exit={{ y: '50vh' }}>
        <Header maxWidth={width}>
          <h2>{post.title}</h2>
          <CreatedAt>
            <ClockIcon />
            {createdAt}
          </CreatedAt>

          {post.description && (
            <ShowMore onClick={() => setShowDescription(x => !x)}>
              {showDescription ? 'show less' : 'show more'}
            </ShowMore>
          )}

          <Button buttonType='action' onClick={onClose} icon={<CloseIcon />} />
        </Header>

        <AnimatePresence>
          {showDescription && (
            <Description
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ type: 'tween', duration: 0.2 }}
              maxWidth={width}
            >
              {post.description}
            </Description>
          )}
        </AnimatePresence>

        <ImageContainer ref={imageRef}>
          <Image src={post.imageUrl} />
        </ImageContainer>

        <ActionBar>
          <AuthorContainer>
            <AuthorPicture src={post.userPhotoUrl || noPhotoPng} />
            <AuthorNick>{post.userNick}</AuthorNick>
          </AuthorContainer>

          <Button buttonType='action' icon={<HeartIcon />} />
          <Button buttonType='action' icon={<CommentsIcon />} />
          {canDelete && (
            <Button
              buttonType='action'
              primaryColor='red'
              icon={<TrashIcon />}
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
