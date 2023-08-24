import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(nuxtApp => {
  const firebaseConfig = {
    apiKey: "AIzaSyDH8Xv8YYDe4vCl-Qv_sbJ48YMYeriwBec"
  }

  initializeApp(firebaseConfig)

  initAuth()
})
