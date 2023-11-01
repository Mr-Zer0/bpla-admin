<template>
  <Layout>
    <section>
      <h3 class="text-3xl font-semibold">Create New Category</h3>
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
      <form @submit.prevent="submit" class="w-full max-w-2xl mx-auto">
        <InputElement
          label="Category Name"
          v-model="name"
          name="name"
          @input="nameInput"
        />

        <InputElement
          label="Category Slug"
          v-model="slug"
          name="slug"
          class="mt-5"
        />

        <TextElement 
          label="Category Description"
          v-model="description"
          name="description"
          class="mt-5"
        />

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
  </Layout>
</template>

<script setup lang="ts">
import router from '@/router'
import { useCategoryStore } from '@/stores/category'
import Layout from '@/components/Layouts/DefaultLayout.vue'
import { ref } from 'vue'
import InputElement from '@/components/Form/InputElement.vue'
import TextElement from '@/components/Form/TextElement.vue'

const name = ref<string>('')
const slug = ref<string>('')
let description = ''
let status = 'Published'

const categoryStore = useCategoryStore()

const nameInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  slug.value = value.replace(/\s+/g, '-').toLocaleLowerCase()
}

const submit = async () => {
  console.log('Name : ', name, 'Slug : ', slug, 'Description : ', description, 'Status : ', status)

  await categoryStore.create({
    name: name.value,
    slug: encodeURIComponent(slug.value),
    description: description,
    status: status
  })

  await categoryStore.fetch(true)

  return router.push('/categories')
}

const draft = async () => {
  status = 'drafted'

  await submit()

  status = 'published'
}
</script>
