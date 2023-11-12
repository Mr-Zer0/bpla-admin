<template>
  <form @submit.prevent="submit">
    <InputElement label="Category Name" v-model="name" name="name" @input="nameInput" />

    <InputElement label="Category Slug" v-model="slug" name="slug" class="mt-5" />

    <TextElement
      label="Category Description"
      v-model="description"
      name="description"
      class="mt-5"
    />

    <hr class="my-10" />

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <a class="ext-sm font-semibold leading-6 text-gray-900 cursor-pointer" @click.prevent="draft">
        Save Draft
      </a>

      <input
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="submit"
        :value="props.type === 'create' ? 'Create' : 'Update'"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import router from '@/router'
import InputElement from '@/components/Form/InputElement.vue'
import TextElement from '@/components/Form/TextElement.vue'
import { useCategoryStore } from '@/stores/category'
import { ref, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: string
    categoryId?: string
  }>(),
  {
    type: 'create'
  }
)

onMounted(async () => {
  if (props.type === 'update') {
    if (props.categoryId) {
      getData(props.categoryId)
    } else {
      throw new Error('! ID NOT FOUND\nUpdate form always require the id to be updated.')
    }
  }
})

const id = ref<string>()
const name = ref<string>('')
const slug = ref<string>('')
const description = ref<string>('')
const status = ref('published')

const categoryStore = useCategoryStore()

const nameInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  slug.value = value.replace(/\s+/g, '-').toLocaleLowerCase()
}

const submit = async () => {
  console.log(
    `Name: ${name.value}\nSlug: ${slug.value}\nDescription: ${description.value}\nStatus: ${status.value}`
  )

  if (props.type === 'update') {
    await update()
  } else {
    await create()
  }

  await categoryStore.fetch(true)

  return router.push('/categories')
}

const draft = async () => {
  status.value = 'drafted'

  await submit()

  status.value = 'published'
}

const create = async () => {
  await categoryStore.create({
    name: name.value,
    slug: encodeURIComponent(slug.value),
    description: description.value,
    status: status.value
  })
}

const update = async () => {
  if (props.categoryId) {
    await categoryStore.update(props.categoryId, {
      name: name.value,
      slug: encodeURIComponent(slug.value),
      description: description.value,
      status: status.value
    })
  }
}

const getData = async (catId: string) => {
  const category = await categoryStore.get(catId)

  if (category) {
    id.value = category.id!
    name.value = category.name
    slug.value = category.slug
    description.value = category.description
    // status.value = category.status
  }
}
</script>
