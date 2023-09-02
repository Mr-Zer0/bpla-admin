import { ref } from "vue"
import { defineStore } from "pinia"
import type { User } from "firebase/auth"

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User|null>(null)

  return { user }
})