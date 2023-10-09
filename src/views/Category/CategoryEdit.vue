<template>
  <section>
    <h3 class="text-3xl font-semibold">Create New Category</h3>
  </section>

  <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
    <form @submit.prevent="submit" class="w-full max-w-2xl mx-auto">
      <div class="col-span-full">
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
          Category Name
        </label>
        <div class="mt-2">
          <input
            v-model="name"
            type="text"
            name="name"
            id="name"
            required
            class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="col-span-full mt-5">
        <label for="slug" class="block text-sm font-medium leading-6 text-gray-900"> Slug </label>
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
        <label for="description" class="block text-sm font-medium leading-6 text-gray-900">
          Description
        </label>
        <div class="mt-2">
          <textarea
            v-model="description"
            id="description"
            name="description"
            rows="3"
            class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>

      <hr class="my-10" />

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <a
          class="ext-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          @click.prevent="draft()"
        >
          Save Draft
        </a>

        <input
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { updateACategory } from '@/firebase/model'
import router from '@/router'
import { useCategoryStore } from '@/stores/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const id = ref('')
const name = ref('')
const slug = ref('')
const description = ref('')
const status = ref('published')

const categoryStore = useCategoryStore()
const route = useRoute()

const submit = async () => {
  console.log('Name : ', name, 'Slug : ', slug, 'Description : ', description, 'Status : ', status)

  await updateACategory(id.value, {
    name: name.value,
    slug: slug.value,
    description: description.value,
    status: status.value
  })

  await categoryStore.fetch(true)

  return router.push('/categories')
}

const draft = async () => {
  status.value = 'drafted'

  await submit()

  status.value = 'published'
}

onMounted(async () => {
  await categoryStore.fetch()

  const category = categoryStore.getOne(route.params.id.toString())

  if (category) {
    id.value = category.id!
    name.value = category.name
    slug.value = category.slug
    description.value = category.description
    status.value = category.status
  }
})
</script>
