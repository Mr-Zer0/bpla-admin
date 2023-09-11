import type { Timestamp } from "firebase/firestore"

export default interface Category {
  name: string,
  slug: string,
  description: string,
  status: string,
  created?: Timestamp,
  modified?: Timestamp
}