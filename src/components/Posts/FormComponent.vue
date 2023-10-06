<template>
  <section>
    <h3 class="text-3xl font-semibold text-slate-700" v-text="formTitle" />
  </section>

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
          <option disabled value="">Select a category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id" v-text="cat.name" />
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
          :value="formSubmit"
        />
      </div>

    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { useCategoryStore } from '@/stores/category';

import type CategoryType from '@/contracts/category.interface'
import { experimentalSetDeliveryMetricsExportedToBigQueryEnabled } from 'firebase/messaging/sw';

const props = defineProps<{
  uid?: string
}>()

const postStore = usePostStore()
const categoryStore = useCategoryStore()
const routerCompose = useRouter()

const formTitle = ref('Create New Post')
const formSubmit = ref('Create')

const ckeditor = CKEditor.component
const ckConfig = {}

let title = ref('')
let slug = ref('')
let excerpt = ref('')
let content = ref('')
let category = ref('')
let status = ref('published')

let categories = ref<Array<CategoryType>>()

if (props.uid) {
  formTitle.value = 'Edit Post'
  formSubmit.value = 'Update'

  onMounted(async () => {
    categories.value = await categoryStore.fetch()

    const result = await postStore.getOne(props.uid!)

    if (!result) routerCompose.push({ name: 'NotFound' })

    title.value = result.title
    slug.value = result.slug
    excerpt.value = result.excerpt
    content.value = result.content
    category.value = result.category.id
  })
}

const submit = async () => {
  const result = categories.value?.find(({ id }) => id === category.value)

  let cat = {
    id: '',
    name: '',
    slug: ''
  }

  if (result) {
    cat = {
      id: result.id!,
      name: result.name,
      slug: result.slug
    }
  }

  await postStore.updatePost(
    props.uid!,
    {
      title: title.value,
      slug: slug.value,
      excerpt: excerpt.value,
      content: content.value,
      status: status.value,
      category: cat
    }
  )

  routerCompose.push({ name: 'posts.home' })
}

const draft = () => {
  status.value = 'drafted'

  submit()

  status.value = 'published'
}
</script>