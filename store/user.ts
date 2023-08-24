export const useUserStore = defineStore('userStore', () => {
  const currentUser:any = ref(null)

  function change(value: any) {
    currentUser.value = value
  }

  return { currentUser, change }
})
