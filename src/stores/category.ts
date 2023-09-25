import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { getAllCategories } from '@/firebase/model'
import type CategoryType from '@/contracts/category.interface'
import type { QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Array<CategoryType>>([])
  const categorySnapshot = ref<QuerySnapshot>()

  const count = computed(() => categorySnapshot.value?.size)
  const empty = computed(() => categorySnapshot.value?.empty)

  /**
   * Fetch data from server
   * @param force boolean
   * @returns array
   */
  async function fetch(force = false) {
    if (! categorySnapshot.value || force) {
      const querySnapshot = await getAllCategories()

      categorySnapshot.value = querySnapshot
      categories.value = querySnapshot.docs.map(x => mapCategory(x))
    }

    return categories.value
  }

  return   { categories, fetch, count, empty }
})

/**
 * Map the query snapshot for categories array
 * @param x QueryDocumentSnapshot
 * @returns CategoryType
 */
const mapCategory = (x: QueryDocumentSnapshot) : CategoryType => {
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