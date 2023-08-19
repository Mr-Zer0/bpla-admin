import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

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

  const userState = useUser()

  onAuthStateChanged(auth, (user) => {
    console.log('user : ', user)

    if (user) {
      userState.value = user
    }
  })

  return credentials
}

/**
 * User sign out
 * @returns boolean
 */
export const signOut = async () => {
  const auth = getAuth()
  const result = auth.signOut()

  return result
}
