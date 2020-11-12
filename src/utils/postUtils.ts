import { IPost, IUser } from '../domain'

export const isLiked = (post: IPost, nick: IUser['nick']) =>
  !!nick && post.likes.includes(nick)
