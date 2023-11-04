<template>
  <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
    <form @submit.prevent="submit">
      <InputElement
        label="Post Title"
        v-model="title"
        name="title"
      />

      <InputElement
        label="Post Slug"
        v-model="slug"
        name="slug"
        class="mt-5"
      />

      <OptionElement
        name="category"
        label="Post Category"
        class="mt-5"
        :options="catList"
        v-model="category"
      />

      <!-- <div class="col-span-full mt-5">
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
      </div> -->

      <TextElement 
        label="Post Excerpt"
        v-model="excerpt"
        name="excerpt"
        class="mt-5"
      />

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
import { usePostStore } from '@/stores/post'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { useCategoryStore } from '@/stores/category'

import InputElement from '../Form/InputElement.vue'
import TextElement from '../Form/TextElement.vue'
import OptionElement from '../Form/OptionElement.vue'

import type CategoryType from '@/contracts/category.interface'

const props = withDefaults(
  defineProps<{
    uid?: string
    type?: string
  }>(),
  {
    type: 'create'
  }
)

const postStore = usePostStore()
const categoryStore = useCategoryStore()
const routerCompose = useRouter()

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
const catList = ref<Array<{
  value: string
  text: string
}>>([])

if (props.uid) {
  formSubmit.value = 'Update'

  onMounted(async () => {
    categories.value = await categoryStore.fetch()

    catList.value = categories.value.map(x => { return { value: x.id!, text: x.name }})

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

  await postStore.updatePost(props.uid!, {
    title: title.value,
    slug: slug.value,
    excerpt: excerpt.value,
    content: content.value,
    status: status.value,
    category: cat
  })

  routerCompose.push({ name: 'posts.home' })
}

const draft = () => {
  status.value = 'drafted'

  submit()

  status.value = 'published'
}
</script>
