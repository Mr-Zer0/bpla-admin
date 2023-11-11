import type { Timestamp } from "firebase/firestore"
export default interface Post {
  id?: string
  title: string
  slug: string
  category: CategoryType
  excerpt: string
  status: string
  content: string
  published?: Date
  created?: Date
  modified?: Date
}

type CategoryType = {
  id: string
  name: string
  slug: string
}
