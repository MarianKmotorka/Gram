import styled from 'styled-components'
import React from 'react'

const Nick = styled.span`
  color: inherit;
  display: inline-block;
  ::first-letter {
    color: ${({ theme }) => theme.accent};
  }
`

export const getFollowingText = (isCurrentUser: boolean, count: number, nick: string) => {
  return (
    <>
      {isCurrentUser ? (
        'You are '
      ) : (
        <>
          <Nick>{nick}</Nick>
          {' is '}
        </>
      )}
      following {count} {count === 1 ? ' person' : ' people'}
    </>
  )
}

export const getFollowedByText = (
  isCurrentUser: boolean,
  count: number,
  nick: string
) => {
  return (
    <>
      {count} {count === 1 ? 'person ' : 'people '} is following{' '}
      {isCurrentUser ? ' you' : <Nick>{nick}</Nick>}
    </>
  )
}
