import styled from 'styled-components'
import { CenteredContainer } from '../../components/CenteredContainer'

export const Wrapper = styled(CenteredContainer)``
export const PostsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  > * {
    margin-top: 10px;
  }
`

export const BottomDiv = styled.div`
  height: 1px;
`
