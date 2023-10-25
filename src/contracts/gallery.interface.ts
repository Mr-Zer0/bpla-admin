import type { Timestamp as FireTime } from 'firebase/firestore'
import type ImageType from './image.interface'

export default interface GalleryType {
  id?: string
  title: string
  slug: string
  status: string
  featured: boolean
  description?: string
  images?: Array<ImageType>
  created?: FireTime
  modified?: FireTime
  published?: FireTime
}
