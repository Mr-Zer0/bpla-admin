<template>
  <section class="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-3">
    <section class="col-span-3 bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
      <form @submit.prevent="submit">
        <InputElement
          label="Post Title"
          v-model="title"
          name="title"
          @input="titleInput"
          @change="titleInput"
        />

        <OptionElement
          name="category"
          label="Post Category"
          class="mt-5"
          :options="selectableCategory"
          v-model="category"
        />

        <div class="col-span-full mt-5">
          <label for="content" class="block text-sm font-medium leading-6 text-slate-700">
            Post Content
          </label>
          <div class="mt-2 document-editor__editable-container">
            <editor :init="init" :api-key="key" v-model="content" />
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

    <aside class="bg-white mt-5 rounded-lg border border-solid border-slate-200">
      <h3 class="font-semibold text-slate-700 p-3 border-b border-b-slate-200">Advance Options</h3>

      <div class="p-5">
        <InputElement label="Post Slug" v-model="slug" name="slug" />

        <InputElement
          label="Published Date"
          v-model="published"
          type="date"
          name="published"
          class="mt-5"
        />

        <text-element
          label="Post Excerpt"
          v-model="excerpt"
          :rows="Number(10)"
          name="excerpt"
          class="mt-5"
        />
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePostStore } from '@/stores/post'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Editor from '@tinymce/tinymce-vue'
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

const init = {
  menubar: false,
  height: '700',
  body_class: 'prose prose-base max-w-none',
  plugins: [
    'image',
    'link',
    'lists',
    'media',
    'searchreplace',
    'table',
    'mediaembed',
    'advtable',
    'editimage',
    'tableofcontents',
    'powerpaste',
    'typography'
  ],
  toolbar:
    'undo redo | blocks | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | removeformat'
}
const key = import.meta.env.VITE_TINY_KEY
const postStore = usePostStore()
const categoryStore = useCategoryStore()
const routerCompose = useRouter()

const formSubmit = ref('Create')

const title = ref('')
const slug = ref('')
const published = ref('')
const excerpt = ref('')
const content = ref('')
const category = ref('')
const status = ref('published')

const categories = ref<Array<CategoryType>>()

const titleInput = (e: Event) => {
  if (props.type === 'create') {
    let value = (e.target as HTMLInputElement).value
    value = value.substring(0, 50)

    slug.value = value.replace(/\s+/g, '-').toLocaleLowerCase()
  }
}

onMounted(async () => {
  categories.value = await categoryStore.getAll()

  if (props.uid) {
    formSubmit.value = 'Update'

    const result = await postStore.getOne(props.uid!)

    if (!result) {
      routerCompose.push({ name: 'NotFound' })
    } else {
      let publishedDate

      if (result.published) {
        const d = result.published

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
  } else {
    const cur = new Date()
    published.value =
      cur.getFullYear() + '-' + (parseInt(cur.getMonth().toString()) + 1) + '-' + cur.getDate()
  }
})

if (props.type === 'create') {
  watch(content, (val: string) => {
    const result = val.replace(/(<([^>]+)>)/gi, '')
    excerpt.value = result.substring(0, 400)

    const last = excerpt.value.slice(-1)

    if (excerpt.value.length === 400 && (last.toString() !== '.' || last.toString() !== '။')) {
      excerpt.value += ' . . .'
    }
  })
}

const selectableCategory = computed(() => {
  if (categories.value) {
    return categories.value.map((x) => {
      return { text: x.name, value: x.id! }
    })
  }

  return []
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
