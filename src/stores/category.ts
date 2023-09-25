import type CategoryType from '@/contracts/category.interface'

import { defineStore } from "pinia"
import { ref } from "vue"

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Array<CategoryType>>([])

  return   { categories }
})