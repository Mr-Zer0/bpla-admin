import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { add, getAllCategories, getOne, update as updateCategory } from '@/firebase/model'
import type CategoryType from '@/contracts/category.interface'
import type { QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Array<CategoryType>>([])
  const categorySnapshot = ref<QuerySnapshot>()
  const collection = 'category'

  const count = computed(() => categories.value.length)
  const empty = computed(() => categories.value.length === 0)

  /**
   * Return category data from state if exist
   * @param force boolean
   * @returns array
   */
  async function fetch(force = false) {
    if (!categorySnapshot.value || force) {
      const querySnapshot = await getAllCategories()

      categorySnapshot.value = querySnapshot
      categories.value = querySnapshot.docs.map((x) => mapCategory(x))
    }

    return categories.value
  }

  function removeACategory(id: string) {
    const result = categories.value.filter((item: CategoryType) => item.id !== id)

    categories.value = result

    return categories.value
  }

  const get = async (uid: string) => {
    if (categories.value.length > 0) {
      return categories.value.find((element) => element.id === uid)
    }

    const snapshot = await getOne(collection, uid)
    const result = snapshot.data()

    result.id = snapshot.id

    return result
  }

  const create = async (payload: CategoryType) => {
    try {
      const response = await add(collection, payload)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  const update = async (uid: string, payload: CategoryType) => {
    await updateCategory(collection, uid, payload)

    if (categories.value.length > 0) {
      const index = categories.value.findIndex((x) => x.id! === uid)

      categories.value[index] = {
        ...categories.value[index],
        ...payload
      }
    }
  }

  return { categories, fetch, removeACategory, count, empty, get, create, update }
})

/**
 * Map the query snapshot for categories array
 * @param x QueryDocumentSnapshot
 * @returns CategoryType
 */
const mapCategory = (x: QueryDocumentSnapshot): CategoryType => {
  const data = x.data()

  return {
    id: x.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    status: data.status,
    created: data.created,
    modified: data.modified
  }
}
