import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

import { useUserStore } from '@/store/user';

/**
 * Initialize and watch the authentication state
 */
export const initAuth = async () => {
  const userStore = useUserStore()

  onAuthStateChanged(getAuth(), (user) => {
    userStore.change(user)
  })
}

/**
 * Create a new firebase user with email and password
 * @param email string
 * @param password string
 * @returns UserCredentialImpl
 */
export const createUser = async (email: string, password: string) => {
  const auth = getAuth()

  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })

  return credentials
}

/**
 * User sign in with email and password into firebase system
 * @param email string
 * @param password string
 * @returns UserCredentialImpl
 */
export const signIn = async (email: string, password: string) => {
  const auth = getAuth()

  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })

  return credentials
}

/**
 * User sign out
 * @returns boolean
 */
export const signOut = async () => {
  const auth = getAuth()
  const result = await auth.signOut()

  return result
}
