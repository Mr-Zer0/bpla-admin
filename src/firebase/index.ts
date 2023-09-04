import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDH8Xv8YYDe4vCl-Qv_sbJ48YMYeriwBec',
  projectId: "website-project-aed0c"
}

const app = initializeApp(config)

export const auth = getAuth(app)
export const db = getFirestore(app)
