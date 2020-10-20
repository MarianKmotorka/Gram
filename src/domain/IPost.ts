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
