export interface IEntity {
  id: string
}

export interface IComment extends IEntity {
  text: string
  userId: string
  postId: string
  userNick: string
  userPhotoUrl: string | null
  timestamp: firebase.firestore.Timestamp
}

export interface IPost extends IEntity {
  title: string
  imageUrl: string
  createdAt: firebase.firestore.Timestamp
  description: string | null

  userId: string
  userNick: string
  userPhotoUrl: string | null

  /**
   * Array of user nicks who liked the post
   */
  likes: Array<string>
}

export interface IUser extends IEntity {
  nick: string
  aboutMe: string | null
  photoUrl: string | null
  postCount: number
  createdAt: firebase.firestore.Timestamp
  lastLogin: firebase.firestore.Timestamp
}
