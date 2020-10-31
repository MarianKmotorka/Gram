import styled from 'styled-components'
import Button from '../../components/Button/Button'
import { CenteredContainer } from '../../components/CenteredContainer'

export const Wrapper = styled(CenteredContainer)`
  height: 100%;
  position: relative;
  padding-top: 15px;

  > * + * {
    margin-top: 25px;
  }
`

export const CreatePostBtn = styled(Button)`
  display: block;
  margin-left: auto;
`
