<template>
  <section class="flex justify-between items-center">
    <h3 class="text-3xl font-semibold">Categories</h3>

    <router-link
      to="/categories/create"
      class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Create
    </router-link>
  </section>

  <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200">
    <article
      v-for="(cat, i) in categoryStore.categories"
      :key="i"
      :class="[
        i === categories.length - 1 ? '' : 'border-b border-solid border-slate-200',
        'px-5 py-3 flex justify-between'
      ]"
    >
      <div class="flex items-center gap-x-2.5">
        <h3 v-text="cat.name" class="text-lg" />
        <p
          :class="[
            cat.status === 'drafted' ? 'text-slate-400' : 'text-green-600',
            'text-xs uppercase font-semibold mt-1'
          ]"
          v-text="cat.status"
        />
      </div>

      <div class="flex flex-wrap md:flex-nowrap items-start gap-2">
        <a href="#">
          <PencilSquareIcon class="w-5 text-slate-500 hover:text-slate-700" />
        </a>
        <button @click="remove(cat.id!)">
          <TrashIcon class="w-5 h-5 text-slate-500 hover:text-slate-700" />
        </button>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useCategoryStore } from '@/stores/category'
import { deleteACategory } from '@/firebase/model'
import type CategoryType from '@/contracts/category.interface'

const categories = ref<Array<CategoryType>>([])
const categoryStore = useCategoryStore()

onMounted(async () => {
  categories.value = await categoryStore.fetch()
})

const remove = async (id: string) => {
  const item = categories.value.find(i => i.id = id)
  const confirmation = confirm(`Are you sure you want to delete the category! \n "${ item?.name }"`)

  if (confirmation) {

    await deleteACategory(id)

    categories.value = await categoryStore.fetch(true)

  }
}
</script>
