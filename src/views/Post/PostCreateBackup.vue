<template>
  <Layout>
    <template v-slot:title>
      <h3 class="text-2xl font-semibold text-slate-700">Create New Post</h3>
    </template>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
      <form @submit.prevent="submit">
        <div class="col-span-full">
          <label for="title" class="block text-sm font-medium leading-6 text-slate-700">
            Post Title
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
          <label for="published" class="block text-sm font-medium leading-6 text-slate-700">
            Published Date
          </label>
          <div class="mt-2">
            <input
              v-model="published"
              type="date"
              name="published"
              id="published"
              required
              class="block rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="col-span-full mt-5">
          <label for="category" class="block text-sm font-medium leading-6 text-slate-700">
            Category
          </label>
          <div class="mt-2">
            <select
              v-model="category"
              name="category"
              id="category"
              required
              class="w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option v-for="cat in categories" :key="cat.id" :value="cat" v-text="cat.name" />
            </select>
          </div>
        </div>

        <div class="col-span-full mt-5">
          <label for="excerpt" class="block text-sm font-medium leading-6 text-slate-700">
            Post Excerpt
          </label>
          <div class="mt-2">
            <textarea
              name="excerpt"
              id="excerpt"
              rows="3"
              v-model="excerpt"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            </textarea>
          </div>
        </div>

        <div class="col-span-full mt-5">
          <label for="content" class="block text-sm font-medium leading-6 text-slate-700">
            Post Content
          </label>
          <div class="mt-2 document-editor__editable-container">
            <ckeditor :editor="ClassicEditor" v-model="content" :config="ckConfig"></ckeditor>
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
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { addPost } from '@/firebase/model'
import router from '@/router'
import { useCategoryStore } from '@/stores/category'
import { ref } from 'vue'
import Layout from '@/components/Layouts/DefaultLayout.vue'
import type CategoryType from '@/contracts/category.interface'
import { onMounted } from 'vue'

let title = ''
let slug = ''
let excerpt = ''
let category: CategoryType | null = null
let status = 'Published'
let content = ''
let published = ''

const ckeditor = CKEditor.component
const ckConfig = {}

const categoryStore = useCategoryStore()

const categories = ref<Array<CategoryType>>()

onMounted(async () => {
  categories.value = await categoryStore.fetch()
})

const submit = async () => {
  const result = await addPost({
    title: title,
    slug: slug,
    excerpt: excerpt,
    content: content,
    status: status,
    category: {
      id: category && category.id ? category.id : '',
      name: category ? category.name : '',
      slug: category ? category.slug : ''
    }
  })

  console.log('Posted result : ', result)

  return router.push('/posts')
}

const draft = async () => {
  status = 'Drafted'

  await submit()

  status = 'Published'
}
</script>

<style lang="scss">
.ck-content {
  height: 500px;

  font-family:
    Inter,
    Walone,
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
  font-weight: 400;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #ee382a;
  }
  h1 {
    font-size: calc(1.375rem + 1.5vw);
  }
  h2 {
    font-size: calc(1.325rem + 0.9vw);
  }
  h3 {
    font-size: calc(1.3rem + 0.6vw);
  }
  h4 {
    font-size: calc(1.275rem + 0.3vw);
  }
  h5 {
    font-size: 1.25rem;
    font-weight: 700;
  }
  h6 {
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    line-height: 1.6rem;
    padding-top: 0.95rem;
    padding-bottom: 0.95rem;
  }

  ul,
  ol {
    margin-left: 1.5rem;

    li {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
    }
  }
}
</style>
