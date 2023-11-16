<template>
  <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
    <form @submit.prevent="submit">
      <InputElement label="Post Title" v-model="title" name="title" />

      <InputElement label="Post Slug" v-model="slug" name="slug" class="mt-5" />

      <InputElement
        label="Published Date"
        v-model="published"
        type="date"
        name="published"
        class="mt-5"
      />

      <OptionElement
        name="category"
        label="Post Category"
        class="mt-5"
        :options="catList"
        v-model="category"
      />

      <TextElement label="Post Excerpt" v-model="excerpt" name="excerpt" class="mt-5" />

      <div class="col-span-full mt-5">
        <label for="content" class="block text-sm font-medium leading-6 text-slate-700">
          Post Content
        </label>
        <div class="mt-2 document-editor__editable-container">
          <ckeditor :editor="ClassicEditor" v-model="content" :config="ckConfig" />
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

const title = ref('')
const slug = ref('')
const published = ref('')
const excerpt = ref('')
const content = ref('')
const category = ref('')
const status = ref('published')

const categories = ref<Array<CategoryType>>()
const catList = ref<
  Array<{
    value: string
    text: string
  }>
>([])

onMounted(async () => {
  categories.value = await categoryStore.fetch()
  catList.value = categories.value.map((x) => {
    return { value: x.id!, text: x.name }
  })

  if (props.uid) {
    formSubmit.value = 'Update'

    const result = await postStore.getOne(props.uid!)

    if (!result) {
      routerCompose.push({ name: 'NotFound' })
    } else {
      let publishedDate

      if (result.published) {
        const d = result.published

        console.log(d)

        publishedDate = d.getFullYear().toString()
        publishedDate += '-'
        publishedDate += String(d.getMonth() + 1).padStart(2, '0')
        publishedDate += '-'
        publishedDate += String(d.getDate()).padStart(2, '0')
      }

      title.value = result.title
      slug.value = result.slug
      published.value = publishedDate!
      excerpt.value = result.excerpt
      content.value = result.content
      category.value = result.category.id
    }
  }
})

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

  const payload = {
    title: title.value,
    slug: slug.value,
    published: new Date(published.value),
    excerpt: excerpt.value,
    content: content.value,
    status: status.value,
    category: cat
  }

  if (props.uid) {
    await postStore.updatePost(props.uid, payload)
  } else {
    await postStore.createPost(payload)
  }

  routerCompose.push({ name: 'posts.home' })
}

const draft = () => {
  status.value = 'drafted'

  submit()

  status.value = 'published'
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
