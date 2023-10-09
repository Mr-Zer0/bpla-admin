import type { Timestamp as FireTime } from 'firebase/firestore'

export default interface GalleryType {
  id?: string
  title: string
  slug: string
  status: string
  featured: boolean
  description?: string
  created?: FireTime
  modified?: FireTime
  published?: FireTime
}
