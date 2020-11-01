import styled from 'styled-components'

export const Padding = styled.div<{ value: string }>`
  padding: ${({ value }) => value};
`

export const Spacing = styled.div<{ value?: number }>`
  > * + * {
    margin-top: ${({ value }) => value + 'px' || '15px'};
  }
`

export const Margin = styled.span<{ value: string }>`
  margin: ${({ value }) => value};
`
