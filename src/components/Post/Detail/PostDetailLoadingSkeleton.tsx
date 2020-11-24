import React, { FC } from 'react'
import { createPortal } from 'react-dom'

import TabView from '../../TabView'
import { useWindowSize } from '../../../hooks'
import { PostDetailTabs } from './PostDetail'
import LoadingOverlay from '../../Loaders/LoadingOverlay'

import { Wrapper, ImageContainer, DetailContainer } from './PostDetail.styled'

const PostDetailLoadingSkeleton: FC = () => {
  const { width } = useWindowSize()

  const component = (
    <Wrapper>
      <ImageContainer>
        <LoadingOverlay />
      </ImageContainer>

      {width > 600 && (
        <DetailContainer>
          <TabView.Container>
            <TabView.Item<PostDetailTabs> tabKey='post' name='Post' />
            <TabView.Item<PostDetailTabs> tabKey='comments' name='Comments' />
            <TabView.Item<PostDetailTabs> tabKey='likes' name='Likes' />
          </TabView.Container>
        </DetailContainer>
      )}
    </Wrapper>
  )

  return createPortal(component, document.getElementById('portal')!)
}

export default PostDetailLoadingSkeleton
