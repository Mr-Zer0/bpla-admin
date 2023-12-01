import type CategoryType from '@/contracts/category.interface'
import type { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { catcher } from '@/util'
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Array<CategoryType>>()
  const roots = ref<Array<CategoryType>>()
  const coll = 'category'
  const catRef = collection(db, coll)

  const fetch = async () => {
    const q = query(catRef, orderBy('modified'))

    try {
      const result = await getDocs(q)
      categories.value = result.docs.map((x) => mapCategory(x))
    } catch (error) {
      catcher(error)
    }
  }

  const getAll = async () => {
    if (!categories.value) {
      await fetch()
    }

    return categories.value
  }

  const getRoots = async () => {
    if (!categories.value) {
      await fetch()
    }

    return categories.value
      ? categories.value.filter((x) => !Object.prototype.hasOwnProperty.call(x, 'parent'))
      : []
  }

  const getHierarchy = async () => {
    const all = await getAll()
    const roots = await getRoots()
    const result = roots.map((x) => {
      return { ...x, children: <Array<CategoryType>>[] }
    })

    if (all) {
      all.map((x) => {
        if (Object.prototype.hasOwnProperty.call(x, 'parent')) {
          const index = result.findIndex((i) => i.id === x.parent?.id)
          result[index].children.push(x)
        }
      })
    }

    return result
  }

  const getByParent = async (parent: string) => {}

  const getById = async (id: string) => {
    if (categories.value) {
      return categories.value.find((x) => x.id === id)
    }

    const docSnap = await getDoc(doc(db, coll, id))
    return mapCategory(docSnap)
  }

  const insert = async (payload: CategoryType) => {
    payload.created = Timestamp.now()
    payload.modified = Timestamp.now()

    try {
      await addDoc(catRef, payload)

      if (categories.value) {
        categories.value.push(payload)
      }
    } catch (error) {
      catcher(error)
    }
  }

  const update = async (id: string, payload: CategoryType) => {
    payload.modified = Timestamp.now()

    try {
      await setDoc(doc(db, coll, id), payload, { merge: true })

      if (categories.value) {
        const index = categories.value.findIndex((x) => x.id === id)

        categories.value[index] = { ...categories.value[index], ...payload }
      }
    } catch (error) {
      catcher(error)
    }
  }

  const remove = async (id: string) => {}

  return {
    categories,
    roots,
    getAll,
    getRoots,
    getByParent,
    getById,
    insert,
    update,
    remove,
    getHierarchy
  }
})

/**
 * Map the query snapshot for categories array
 * @param x QueryDocumentSnapshot
 * @returns CategoryType
 */
const mapCategory = (x: DocumentSnapshot): CategoryType => {
  const data = x.data()
  let result: CategoryType

  if (data) {
    result = {
      id: x.id,
      name: data.name,
      slug: data.slug,
      type: data.slug,
      description: data.description,
      status: data.status,
      created: data.created.toDate(),
      modified: data.modified.toDate()
    }

    if (data.parent) {
      result.parent = data.parent
    }
  } else {
    result = {
      id: x.id,
      name: '',
      slug: '',
      type: '',
      description: '',
      status: ''
    }
  }

  return result
}
