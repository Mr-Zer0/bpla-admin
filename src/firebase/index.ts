import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: "AIzaSyDH8Xv8YYDe4vCl-Qv_sbJ48YMYeriwBec"
}

const app = initializeApp(config)

export const auth = getAuth(app)