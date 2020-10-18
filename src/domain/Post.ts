export interface IPost {
  id: string
  title: string
  imageUrl: string
  userId: string
  createdAt: firebase.firestore.Timestamp
  description?: string
}
