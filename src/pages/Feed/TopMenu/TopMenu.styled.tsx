import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  height: 60px;

  @media only screen and (max-width: 400px) {
    border-radius: 0px;
  }
`
