import React, { FC, useState } from 'react'
import { createPortal } from 'react-dom'

import { IPost } from '../../../domain'
import { useMouseMoving, useWindowSize } from '../../../hooks'
import IconButton from '../../Button/IconButton'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CommentsIcon,
  HeartFilledIcon,
  HeartIcon,
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
import PostInfo from './PostInfo/PostInfo'

interface IPostDetailProps {
  post: IPost
  isLiked: boolean
  onLike: () => Promise<void>
  onClose: () => void
}

const PostDetail: FC<IPostDetailProps> = ({ post, isLiked, onClose, onLike }) => {
  const [mouseMoving, onMouseMove] = useMouseMoving()
  const { width } = useWindowSize()
  const [expanded, setExpanded] = useState(width > 600)

  const visibility = mouseMoving ? 'visible' : 'hidden'
  const showBottomBtns = mouseMoving && (width > 600 || !expanded)

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
          </BottomButtonsContainer>
        )}
      </ImageContainer>

      {expanded && (
        <DetailContainer>
          <PostInfo post={post} />
        </DetailContainer>
      )}
    </Wrapper>
  )

  return createPortal(component, document.getElementById('portal')!)
}

export default PostDetail
