<template>
  <form @submit.prevent="submit">
    <InputElement label="Name" v-model="name" name="name" @input="nameInput" :required="true" />

    <InputElement label="Slug" v-model="slug" name="slug" :required="true" class="mt-5" />

    <option-element
      :options="selectableRoots"
      label="Parent"
      name="parent"
      v-model="parent"
      class="mt-6"
    />

    <TextElement label="Description" v-model="description" name="description" class="mt-5" />

    <hr class="my-10" />

    <div class="mt-6 flex items-center justify-end gap-x-6">
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
import OptionElement from '../Form/OptionElement.vue'
import { useCategoryStore } from '@/stores/category'
import { ref, onMounted, computed } from 'vue'
import type CategoryType from '@/contracts/category.interface'

const props = withDefaults(
  defineProps<{
    type?: string
    categoryId?: string
  }>(),
  {
    type: 'create'
  }
)

const id = ref<string>()
const name = ref<string>('')
const slug = ref<string>('')
const description = ref<string>('')
const status = ref('published')
const parent = ref<string>()

const categoryStore = useCategoryStore()
const roots = ref<Array<CategoryType>>()

onMounted(async () => {
  roots.value = await categoryStore.getRoots()

  if (props.categoryId) {
    const response = await categoryStore.getById(props.categoryId)

    if (response) {
      id.value = response.id
      name.value = response.name
      slug.value = response.slug
      description.value = response.description
      parent.value = response.parent?.id
    }
  }
})

const selectableRoots = computed(() => {
  if (roots.value) {
    return roots.value.map((x) => {
      return { text: x.name, value: x.id! }
    })
  }

  return []
})

const nameInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  slug.value = value.replace(/\s+/g, '-').toLocaleLowerCase()
}

const submit = async () => {
  if (props.categoryId) {
    await categoryStore.update(props.categoryId, makePayload())
  } else {
    await categoryStore.insert(makePayload())
  }

  return router.push('/categories')
}

const makePayload = () => {
  const payload: CategoryType = {
    name: name.value,
    slug: slug.value,
    description: description.value,
    status: status.value
  }

  if (parent.value && roots.value) {
    const temp = roots.value.find((x) => x.id === parent.value)

    if (temp) {
      payload.parent = {
        id: temp.id!,
        slug: temp.slug,
        name: temp.name
      }
    }
  }

  return payload
}
</script>
