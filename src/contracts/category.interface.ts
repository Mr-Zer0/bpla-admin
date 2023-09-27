import type { Timestamp } from 'firebase/firestore'

export default interface Category {
  id?: NonNullable<string>
  name: string
  slug: string
  description: string
  status: string
  created?: Timestamp
  modified?: Timestamp
}
