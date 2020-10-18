import styled from 'styled-components'

export const Padding = styled.div<{ value: string }>`
  padding: ${({ value }) => value};
`
