export const getFollowingText = (isCurrentUser: boolean, count: number, nick: string) => {
  return `${isCurrentUser ? 'You are' : `${nick} is`} following ${count} ${
    count === 1 ? 'person' : 'people'
  }`
}

export const getFollowedByText = (
  isCurrentUser: boolean,
  count: number,
  nick: string
) => {
  return `${count} ${count === 1 ? 'person' : 'people'} is following ${
    isCurrentUser ? 'you' : nick
  }`
}
