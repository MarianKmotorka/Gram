import React, { FC, useState } from 'react'
import { createPortal } from 'react-dom'

import Likes from './Likes/Likes'
import TabView from '../../TabView'
import PostInfo from './PostInfo/PostInfo'
import Comments from './Comments/Comments'
import IconButton from '../../Button/IconButton'
import { IPost, IComment, IUser } from '../../../domain'
import { useMouseMoving, useWindowSize } from '../../../hooks'
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

export type PostDetailTabs = 'post' | 'comments' | 'likes'

interface IPostDetailProps {
  post: IPost
  isLiked: boolean
  isFollowed: boolean
  canDelete: boolean
  canFollow: boolean
  currentUser: IUser
  comments: IComment[]
  defaultTabName?: string
  onClose: () => void
  onLike: () => Promise<void>
  onFollow: () => Promise<void>
  onDelete: (post: IPost) => Promise<void>
  onCommentSubmit: (text: string) => Promise<void>
  onDeleteComment: (id: string) => Promise<void>
}

const PostDetail: FC<IPostDetailProps> = ({
  post,
  isLiked,
  comments,
  canDelete,
  canFollow,
  isFollowed,
  currentUser,
  onClose,
  onLike,
  onDelete,
  onFollow,
  onCommentSubmit,
  onDeleteComment,
}) => {
  const { width } = useWindowSize()
  const [deleting, setDeleting] = useState(false)
  const [expanded, setExpanded] = useState(width > 600)
  const [mouseMoving, onMouseMove] = useMouseMoving()
  const [selectedTab, setSelectedTab] = useState<PostDetailTabs>('post')

  const visibility = mouseMoving ? 'visible' : 'hidden'
  const showBottomBtns = mouseMoving && (width > 600 || !expanded)

  const handleDeleted = async () => {
    if (deleting) return
    setDeleting(true)
    await onDelete(post)
  }

  const handleCommentsButtonClicked = () => {
    setExpanded(true)
    setSelectedTab('comments')
  }

  const component = (
    <Wrapper onMouseMove={onMouseMove}>
      <ImageContainer>
        <IconButton
          icon={<CloseIcon color='bg' />}
          onClick={onClose}
          visibility={visibility}
          left='5px'
          top='5px'
          position='fixed'
        />

        <IconButton
          icon={
            expanded ? <ChevronRightIcon color='bg' /> : <ChevronLeftIcon color='bg' />
          }
          onClick={() => setExpanded(x => !x)}
          visibility={visibility}
          right='5px'
          top='5px'
          position={width < 600 ? 'fixed' : 'absolute'}
        />
        <BlurredBackground src={post.imageUrl} />
        <Image src={post.imageUrl} />

        {showBottomBtns && (
          <BottomButtonsContainer>
            <BottomButton onClick={onLike}>
              {isLiked ? <HeartFilledIcon color='red' /> : <HeartIcon color='bg' />}
              <span>{post.likes.length}</span>
            </BottomButton>

            <BottomButton onClick={handleCommentsButtonClicked}>
              <CommentsIcon color='bg' /> <span>{comments.length}</span>
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
          <TabView.Container selectedKey={selectedTab} onChange={setSelectedTab}>
            <TabView.Item<PostDetailTabs> tabKey='post' name='Post'>
              <PostInfo
                post={post}
                onFollow={onFollow}
                isFollowed={isFollowed}
                canFollow={canFollow}
              />
            </TabView.Item>

            <TabView.Item<PostDetailTabs> tabKey='comments' name='Comments'>
              <Comments
                comments={comments}
                currentUser={currentUser}
                onSubmit={onCommentSubmit}
                onDelete={onDeleteComment}
              />
            </TabView.Item>

            <TabView.Item<PostDetailTabs> tabKey='likes' name='Likes'>
              <Likes likes={post.likes} />
            </TabView.Item>
          </TabView.Container>
        </DetailContainer>
      )}
    </Wrapper>
  )

  return createPortal(component, document.getElementById('portal')!)
}

export default PostDetail
