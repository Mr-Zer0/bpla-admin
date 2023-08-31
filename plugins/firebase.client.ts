import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyDH8Xv8YYDe4vCl-Qv_sbJ48YMYeriwBec"
  }

  const firebaseApp = initializeApp(firebaseConfig)

  console.log('=== Firebase has been initialized ===')
})
