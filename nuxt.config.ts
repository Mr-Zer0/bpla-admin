// https://nuxt.com/docs/api/configuration/nuxt-config
import bpla from './bpla.config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["@headlessui/vue"]
  },
  pages: true,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    head: {
      title: bpla.name_short,
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'
        }
      ]
    }
  }
})
