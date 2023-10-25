import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('image', () => {
  const collection = 'images'
  const imgbb = 'https://api.imgbb.com/1/upload?key=' + import.meta.env.VITE_IMGBB_KEY
  const images = ref<Array<File>>([])
  const imgData = ref([])

  const uploadAll = async () => {
    images.value.forEach(async (item) => {
      const response = await upload(item)

      const json = response.json()
    })
  }

  const upload = async (file: File): Promise<Response> => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(imgbb, {
      method: 'POST',
      body: formData
    })

    return response
  }

  return { images }
})
