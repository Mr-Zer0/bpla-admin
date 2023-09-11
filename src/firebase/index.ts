import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  projectId: import.meta.env.VITE_PROJECT_ID
}

const app = initializeApp(config)

console.log('===! Firebase App Initialized !===')

export const auth = getAuth(app)
export const db = getFirestore(app)
