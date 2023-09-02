import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '@/stores/auth.js'
import type { Auth } from 'firebase/auth'

let auth:Auth

export const init = (authValue:Auth) => {
  auth = authValue

  onAuthStateChanged(auth, (user) => {
    const authStore = useAuthStore()
    authStore.user = user

    console.log('Auth state has changed : ', user)
  })
}

/**
 * Get current logged in user from firebase
 * @returns Promise
 */
export const currentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        console.log('Auth state changed : ', user)

        resolve(user)
      },
      reject
    )
  })
}

/**
 * User sign in with email and password into firebase system
 * @param email string
 * @param password string
 * @returns UserCredentialImpl
 */
export const signIn = async (email: string, password: string) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })

  console.log('Logged in : ', credentials)

  return credentials
}

/**
 * User sign out
 * @returns boolean
 */
export const signOut = async () => {
  const result = await auth.signOut()

  return result
}
