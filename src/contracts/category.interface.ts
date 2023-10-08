import type { Timestamp } from 'firebase/firestore'
import type ImageType from './image.interface'

export default interface Category {
  id?: NonNullable<string>
  name: string
  slug: string
  description: string
  status: string
  created?: Timestamp
  modified?: Timestamp
  images?: ImageType
}
