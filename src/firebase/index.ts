import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { init } from './fireauth'

const config = {
  apiKey: 'AIzaSyDH8Xv8YYDe4vCl-Qv_sbJ48YMYeriwBec'
}

const app = initializeApp(config)

init(getAuth(app))
