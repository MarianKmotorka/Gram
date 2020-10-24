export interface IPost {
  id: string
  title: string
  imageUrl: string
  createdAt: firebase.firestore.Timestamp
  description?: string

  userId: string
  userNick: string
  userPhotoUrl?: string | null
}

export interface IUser {
  id: string
  nick: string
  createdAt: firebase.firestore.Timestamp
  aboutMe?: string
  photoUrl?: string
}
