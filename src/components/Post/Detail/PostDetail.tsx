import React, { FC, useState } from 'react'
import { createPortal } from 'react-dom'

import TabView from '../../TabView'
import { IPost } from '../../../domain'
import { useMouseMoving, useWindowSize } from '../../../hooks'
import PostInfo from './PostInfo/PostInfo'
import IconButton from '../../Button/IconButton'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CommentsIcon,
  HeartFilledIcon,
  HeartIcon,
  LoadingIcon,
  TrashIcon,
} from '../../Icons'

import {
  BlurredBackground,
  BottomButton,
  BottomButtonsContainer,
  DetailContainer,
  Image,
  ImageContainer,
  Wrapper,
} from './PostDetail.styled'

interface IPostDetailProps {
  post: IPost
  isLiked: boolean
  canDelete: boolean
  onClose: () => void
  onLike: () => Promise<void>
  onDelete?: (post: IPost) => Promise<void>
}

const PostDetail: FC<IPostDetailProps> = ({
  post,
  isLiked,
  canDelete,
  onClose,
  onLike,
  onDelete,
}) => {
  const [mouseMoving, onMouseMove] = useMouseMoving()
  const { width } = useWindowSize()
  const [deleting, setDeleting] = useState(false)
  const [expanded, setExpanded] = useState(width > 600)

  const visibility = mouseMoving ? 'visible' : 'hidden'
  const showBottomBtns = mouseMoving && (width > 600 || !expanded)

  const handleDeleted = async () => {
    if (!onDelete || deleting) return
    setDeleting(true)
    await onDelete(post)
  }

  const component = (
    <Wrapper onMouseMove={onMouseMove}>
      <ImageContainer>
        <IconButton
          icon={<CloseIcon color='bg' />}
          onClick={onClose}
          visibility={visibility}
          left='15px'
          top='15px'
          position='fixed'
        />

        <IconButton
          icon={
            expanded ? <ChevronRightIcon color='bg' /> : <ChevronLeftIcon color='bg' />
          }
          onClick={() => setExpanded(x => !x)}
          visibility={visibility}
          right='15px'
          top='15px'
          position={width < 600 ? 'fixed' : 'absolute'}
        />
        <BlurredBackground src={post.imageUrl} />
        <Image src={post.imageUrl} />

        {showBottomBtns && (
          <BottomButtonsContainer>
            <BottomButton onClick={onLike}>
              {isLiked ? <HeartFilledIcon color='accent' /> : <HeartIcon color='bg' />}
              <span>{post.likes.length}</span>
            </BottomButton>

            <BottomButton>
              <CommentsIcon color='bg' /> <span>-</span>
            </BottomButton>

            {canDelete && (
              <BottomButton onClick={handleDeleted}>
                {deleting ? (
                  <LoadingIcon color='accent' fontSize='20px' />
                ) : (
                  <TrashIcon color='accent' />
                )}
              </BottomButton>
            )}
          </BottomButtonsContainer>
        )}
      </ImageContainer>

      {expanded && (
        <DetailContainer>
          <TabView.Container>
            <TabView.Item name='Post'>
              <PostInfo post={post} />
            </TabView.Item>

            <TabView.Item name='Comments'>
              <h3>work in progress...</h3>
            </TabView.Item>

            <TabView.Item name='Likes'>
              <h3>LIKES</h3>
            </TabView.Item>
          </TabView.Container>
        </DetailContainer>
      )}
    </Wrapper>
  )

  return createPortal(component, document.getElementById('portal')!)
}

export default PostDetail
