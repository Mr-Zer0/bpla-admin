<template>
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
        <label for="slug" class="block text-sm font-medium leading-6 text-slate-700"> Slug </label>
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

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <a
          class="ext-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          @click.prevent="draft()"
        >
          Save Draft
        </a>

        <input
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          type="submit"
          value="Submit"
        />
      </div>

    </form>

  </section>
</template>

<script setup lang="ts">
import { useGalleryStore } from '@/stores/gallery';
import { ref } from 'vue';

const title = ref('')
const slug = ref('')
const description = ref('')
const status = ref('published')
const featured = ref(false)

const submit = async () => {
  const payload = {
    title: title.value,
    slug: slug.value,
    description: description.value,
    status: status.value,
    featured: featured.value
  }
  
  
}

const draft = () => {
  status.value = 'drafted'

  submit()

  status.value = 'published'
}
</script>