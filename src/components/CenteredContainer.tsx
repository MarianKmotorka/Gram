import styled from 'styled-components'

export const CenteredContainer = styled.div`
  max-width: 75%;
  margin: 0 auto;
  height: 100%;

  @media only screen and (max-width: 1250px) {
    max-width: 80%;
  }

  @media only screen and (max-width: 700px) {
    max-width: 90%;
  }

  @media only screen and (max-width: 400px) {
    max-width: 100%;
    padding: 0 5px;
  }
`

export default CenteredContainer
