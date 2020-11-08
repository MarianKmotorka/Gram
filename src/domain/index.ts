export interface IEntity {
  id: string
}

export interface IPost extends IEntity {
  title: string
  imageUrl: string
  createdAt: firebase.firestore.Timestamp
  description?: string

  userId: string
  userNick: string
  userPhotoUrl?: string

  /**
   * Array of user nicks who liked the post
   */
  likes: Array<string>
}

export interface IUser extends IEntity {
  nick: string
  createdAt: firebase.firestore.Timestamp
  aboutMe?: string
  photoUrl?: string
  postCount: number
}
