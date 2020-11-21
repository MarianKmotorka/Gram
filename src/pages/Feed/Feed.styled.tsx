import styled from 'styled-components'
import Button from '../../components/Button/Button'
import { CenteredContainer } from '../../components/CenteredContainer'

export const Wrapper = styled(CenteredContainer)`
  display: flex;
  height: auto;
  justify-content: center;

  > div:first-of-type {
    margin-right: 22px;
  }

  > div:last-of-type {
    margin-left: 22px;
  }
`
export const PostsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin-top: 25px;

  > div + div {
    margin-top: 15px;
  }

  @media only screen and (max-width: 400px) {
    > div + div {
      margin-top: 10px;
    }
  }
`

export const DummymSpan = styled.span`
  height: 1px;
  display: inline-block;
`

export const ScrollUpButton = styled(Button)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 20px;
  right: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  i {
    cursor: inherit;
  }
`
