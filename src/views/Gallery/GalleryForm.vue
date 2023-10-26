<template>
  <Layout>
    <section>
      <h3 class="text-3xl font-semibold text-slate-700">Gallery Form</h3>
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
      <form @submit.prevent="submit">
        <div class="col-span-full">
          <label for="title" class="block text-sm font-medium leading-6 text-slate-700">
            Gallery Title
          </label>
          <div class="mt-2">
            <input
              v-model="title"
              type="text"
              name="title"
              id="title"
              required
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="col-span-full mt-5">
          <label for="slug" class="block text-sm font-medium leading-6 text-slate-700">
            Slug
          </label>
          <div class="mt-2">
            <input
              v-model="slug"
              type="text"
              name="slug"
              id="slug"
              required
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="col-span-full mt-5">
          <label for="description" class="block text-sm font-medium leading-6 text-slate-700">
            Gallery Descrption
          </label>
          <div class="mt-2">
            <textarea
              name="description"
              id="description"
              rows="3"
              v-model="description"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            </textarea>
          </div>
        </div>

        <div class="col-span-full mt-5">
          <div id="pictup" class="bg-slate-100 w-full h-80 rounded-lg p-4 flex gap-3">
            <form
              class="w-16 h-16 border-2 border-solid border-slate-400 rounded-md relative text-slate-400"
            >
              <input
                type="file"
                name="file[]"
                @change="choose"
                id="file"
                multiple
                accept="image/*"
                class="absolute w-full h-full top-0 left-0 cursor-pointer opacity-0"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="-6 -6 36 36"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-full h-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </form>

            <figure
              v-for="(img, i) in pictupImgs"
              :key="i"
              class="w-16 h-16 rounded-md overflow-hidden"
            >
              <img :src="img.toString()" alt="" class="object-cover w-full h-full" />
            </figure>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <a
            class="ext-sm font-semibold leading-6 text-gray-900 cursor-pointer"
            @click.prevent="draft()"
          >
            Save Draft
          </a>

          <input
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            type="submit"
            value="Submit"
            :disabled="!submitable"
          />
        </div>
      </form>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import type ImageType from '@/contracts/image.interface'
import { useGalleryStore } from '@/stores/gallery'
import { ref } from 'vue'
import Layout from '@/components/Layouts/DefaultLayout.vue'

const submitable = ref(true)

const title = ref('')
const slug = ref('')
const description = ref('')
const featured = ref(false)
const status = ref('published')
const images = ref<Array<ImageType>>([])

const imageBag = ref<Array<File>>([])
const pictupImgs = ref<Array<String>>([])

const galleryStore = useGalleryStore()

const choose = (e: Event) => {
  const files = e.target && (e.target as HTMLInputElement).files

  if (files) {
    for (const file of files) {
      imageBag.value.push(file)

      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        e.target && pictupImgs.value.push(e.target.result as String)
      }

      reader.readAsDataURL(file)
    }
  }
}

const submit = async () => {
  log('Func => submit function runs')

  submitable.value = false

  uploadAll(imageBag.value, upload)
    .then(() => {
      const payload = {
        title: title.value,
        slug: slug.value,
        description: description.value,
        images: images.value,
        status: status.value,
        featured: featured.value
      }

      galleryStore.create(payload)
    })
    .then(() => (submitable.value = true))
}

const uploadAll = async (
  arr: Array<File>,
  callback: (file: File) => Promise<Response>
): Promise<void> => {
  log('Func => uploadAll function runs')

  for (const item of arr) {
    const resp = await callback(item)
    const { data } = await resp.json()

    log('Action => response has been serialized')

    images.value.push({
      id: data.id,
      file_name: data.image.filename,
      width: data.width,
      height: data.height,
      size: data.size,
      full_url: data.display_url,
      thumbnail_url: data.thumb.url,
      delete_url: data.delete_url,
      extension: data.image.extension,
      mime: data.image.mime
    })
  }
}

const upload = async (file: File): Promise<Response> => {
  log('Func => upload function runs')
  const imgbb = 'https://api.imgbb.com/1/upload?key=' + import.meta.env.VITE_IMGBB_KEY

  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(imgbb, {
    method: 'POST',
    body: formData
  })

  log('API => an image has been uploaded')

  return response
}

const log = (msg: string) => {
  const current = new Date()

  console.log(
    `[${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}.${current.getMilliseconds()}] ${msg}`
  )
}

const draft = () => {
  status.value = 'drafted'

  submit()

  status.value = 'published'
}
</script>
