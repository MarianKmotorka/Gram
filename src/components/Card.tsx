import styled from 'styled-components'

const Card = styled.div<{ bg?: string; width?: string }>`
  padding: 15px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme, bg }) => (bg ? theme[bg] : theme.bg)};
  width: ${({ width }) => width || 'auto'};
`

export default Card
