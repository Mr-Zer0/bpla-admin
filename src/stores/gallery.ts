import { reactive, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { add, getAll, getOne, update as updateGallery } from '@/firebase/model'

import type GalleryType from '@/contracts/gallery.interface'
import type { QueryDocumentSnapshot } from 'firebase/firestore'

export const useGalleryStore = defineStore('gallery', () => {
  const collection = 'gallery'
  const galleries = ref<Array<GalleryType>>([])

  const fetch = async (force: boolean = false) => {
    if (force || galleries.value.length === 0) {
      const snapshot = await getAll(collection)

      galleries.value = snapshot.docs.map((x) => mapGallery(x))
    }

    return galleries.value
  }

  const get = async (uid: string) => {
    if (galleries.value.length > 0) {
      return galleries.value.find((x) => x.id! === uid)
    }

    const snapshot = await getOne(collection, uid)
    const result = snapshot.data()

    result.id = snapshot.id

    return result
  }

  const create = async (payload: GalleryType) => {
    if (payload.images) {
      console.log('Payload Images are : ', payload.images)

      const temp = payload.images

      console.log('The temp : ', temp)

      // temp.forEach(e => console.log('current : ', e))
      // const images = temp.map(e => console.log('current : ', e))

      //const imagesArray = Object.getOwnPropertyNames(temp).map(key => temp[key])

      const imagesArray = toRaw(temp)

      console.log('Images Array : ', imagesArray)

      // const images = Object.values(payload.images)

      // console.log('Object.values: ', images)
    }

    console.log('About to create document with the payload: ', payload)

    // const result = await add(collection, payload)

    // console.log(result)
  }

  const update = async (uid: string, payload: GalleryType) => {
    await updateGallery(collection, uid, payload)

    if (galleries.value.length > 0) {
      const index = galleries.value.findIndex((x) => x.id! === uid)

      galleries.value[index] = {
        ...galleries.value[index],
        ...payload
      }
    }
  }

  return { galleries, fetch, get, create, update }
})

const mapGallery = (snapshot: QueryDocumentSnapshot): GalleryType => {
  const data = snapshot.data()

  return {
    id: snapshot.id,
    title: data.title,
    slug: data.slug,
    status: data.status,
    featured: false,
    description: data.description,
    created: data.created,
    modified: data.modified,
    published: data.modified
  }
}
