import type { Timestamp } from "firebase/firestore"

export default interface Category {
  title: string,
  slug: string,
  excerpt: string,
  status: string,
  content: string,
  created?: Timestamp,
  modified?: Timestamp
}