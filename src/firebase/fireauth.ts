import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './index.js'

export const currentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
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
