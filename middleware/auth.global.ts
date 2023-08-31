import { currentUser } from "@/composables/useFireauth"

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  if (process.client) {
    console.log('Middleware is running !!!')

    const user = await currentUser()

    if (to.path === '/login') {
      if (user) {
        return navigateTo('/')
      }
    } else {
      if (!user) {
        return navigateTo('/login')
      }
    }
  }
})
