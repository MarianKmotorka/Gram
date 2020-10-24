import styled from 'styled-components'
import Button from '../../components/Button/Button'

export const Wrapper = styled.div`
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
