import type { Timestamp } from "firebase/firestore"
import { defineStore } from "pinia"
import { ref } from "vue"

export type Category = {
  name: string|undefined,
  slug: string|undefined,
  description: string|undefined,
  status: string|undefined,
  created: Timestamp,
  modified: Timestamp
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Array<Category>>([])

  

  return   { categories }
})