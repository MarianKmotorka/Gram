import styled from 'styled-components'

export const Wrapper = styled.div`
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  background-color: ${({ theme }) => theme.bg};
  max-height: 80vh;
`

export const Header = styled.header`
  border-radius: 25px 25px 0 0;
  font-size: 20px;
  padding: 15px 25px;
`

export const Image = styled.img`
  max-height: 100%;
`

export const Footer = styled.footer`
  border-radius: 0 0 25px 25px;
  padding: 8px 25px;
`
