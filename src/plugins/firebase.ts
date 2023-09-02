import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { init } from '@/firebase/fireauth'

export default {
  install: () => {
    const config = {
      apiKey: 'AIzaSyDH8Xv8YYDe4vCl-Qv_sbJ48YMYeriwBec'
    }

    const app = initializeApp(config)

    init(getAuth(app))
  }
}
