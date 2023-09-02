import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Firebase from './plugins/firebase'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(Firebase)
app.use(router)

app.mount('#app')
