import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '@/stores/auth.js'
import { auth } from './index'
import { FirebaseError } from 'firebase/app'
import { ref } from 'vue'

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

        const authStore = useAuthStore()
        authStore.user = user

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
  await signInWithEmailAndPassword(auth, email, password)
}

/**
 * User sign out
 * @returns boolean
 */
export const signOut = async () => {
  console.log('Signing out')

  const result = await auth.signOut()

  return result
}
