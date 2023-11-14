import { ref } from 'vue'
import { defineStore } from 'pinia'
import { add, getAll, getOne, update as updateGallery } from '@/firebase/model'

import type GalleryType from '@/contracts/gallery.interface'
import { deleteDoc, doc, type QueryDocumentSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { catcher } from '@/util'

export const useGalleryStore = defineStore('gallery', () => {
  const collection = 'gallery'
  const galleries = ref<Array<GalleryType>>([])

  const log = (msg: string) => {
    const d = new Date()
    console.log(
      `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}] ${msg}`
    )
  }

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
    log('Func => create function runs')

    if (payload.images) {
      const temp = payload.images

      console.log('The temp : ', temp)
    }

    console.log('About to create document with the payload: ', payload)

    const result = await add(collection, payload)

    console.log(result)
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

  const remove = async (uid: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', uid))
    } catch (e) {
      catcher(e)
    }

    const index = galleries.value.findIndex(x => x.id === uid)
    galleries.value.splice(index, 1)
  }

  return { galleries, fetch, get, create, update, remove }
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
