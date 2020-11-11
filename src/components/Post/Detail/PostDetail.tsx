import React, { FC, useState } from 'react'
import { createPortal } from 'react-dom'

import { IPost } from '../../../domain'
import { useMouseMoving } from '../../../hooks'
import IconButton from '../../Button/IconButton'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../../Icons'

import {
  BlurredBackground,
  DetailContainer,
  Image,
  ImageContainer,
  Wrapper,
} from './PostDetail.styled'

interface IPostDetailProps {
  post: IPost
  onClose: () => void
}

const PostDetail: FC<IPostDetailProps> = ({ post, onClose }) => {
  const [mouseMoving, onMouseMove] = useMouseMoving()
  const [expanded, setExpanded] = useState(true)
  const visibility = mouseMoving ? 'visible' : 'hidden'

  const component = (
    <Wrapper onMouseMove={onMouseMove}>
      <ImageContainer>
        <IconButton
          icon={<CloseIcon color='bg' />}
          onClick={onClose}
          visibility={visibility}
          left='15px'
          top='15px'
        />

        <IconButton
          icon={
            expanded ? <ChevronRightIcon color='bg' /> : <ChevronLeftIcon color='bg' />
          }
          onClick={() => setExpanded(x => !x)}
          visibility={visibility}
          right='15px'
          top='15px'
        />
        <BlurredBackground src={post.imageUrl} />
        <Image src={post.imageUrl} />
      </ImageContainer>

      {expanded && <DetailContainer></DetailContainer>}
    </Wrapper>
  )

  return createPortal(component, document.getElementById('portal')!)
}

export default PostDetail
