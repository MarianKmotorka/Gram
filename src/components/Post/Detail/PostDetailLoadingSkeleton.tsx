import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import { useWindowSize } from '../../../hooks'
import LoadingOverlay from '../../Loaders/LoadingOverlay'
import TabView from '../../TabView'
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
            <TabView.Item name='Post' />
            <TabView.Item name='Comments' />
            <TabView.Item name='Likes' />
          </TabView.Container>
        </DetailContainer>
      )}
    </Wrapper>
  )

  return createPortal(component, document.getElementById('portal')!)
}

export default PostDetailLoadingSkeleton
