import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
0%{
    transform:rotate(80deg);
}
100%{
    transform:rotate(-440deg);
}
`

export const LoadingProgress = styled.div`
  animation: 2s ${rotate} ease-in-out infinite alternate;
`
