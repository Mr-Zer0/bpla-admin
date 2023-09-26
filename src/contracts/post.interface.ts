import type { Timestamp } from "firebase/firestore"

export default interface Post {
  id?: string,
  title: string,
  slug: string,
  excerpt: string,
  status: string,
  content: string,
  published?: Date,
  created?: Date,
  modified?: Date
  // created?: Timestamp,
  // modified?: Timestamp
}