import styled from 'styled-components'
import { Button } from '../../components'
import { CenteredContainer } from '../../components/CenteredContainer'

export const Wrapper = styled(CenteredContainer)`
  height: 100%;
  position: relative;
  padding-top: 15px;
`

export const NewPostButton = styled(Button)`
  position: fixed;
  bottom: 50px;
  right: 13%;
  z-index: 5;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.3);

  i {
    margin-right: 10px;
  }

  @media only screen and (max-width: 1250px) {
    right: 11%;
  }

  @media only screen and (max-width: 700px) {
    right: 7%;
  }
`
