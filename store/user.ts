export const useUserStore = defineStore('userStore', () => {
  const currentUser:any = ref(null)

  function authenticate(value: any) {
    currentUser.value = value
  }

  function unauthenticate() {
    currentUser.value = null
  }

  return { currentUser, authenticate, unauthenticate }
})
