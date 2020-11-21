import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  padding: 5px 15px;
  align-items: center;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  height: 60px;

  p {
    color: ${({ theme }) => theme.bg};
  }

  @media only screen and (max-width: 400px) {
    border-radius: 0px;
  }
`
