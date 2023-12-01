<template>
  <Layout>
    <template v-slot:title>
      <h3 class="text-2xl font-semibold">Categories</h3>

      <router-link
        to="/categories/create"
        class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create
      </router-link>
    </template>

    <section class="mt-5 flex flex-col gap-2">
      <div
        v-for="(cat, i) in categories"
        :key="i"
        class=""
      >
        <article class="flex justify-between px-5 py-3 bg-white rounded-lg border border-solid border-slate-200">

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
            <router-link :to="'/categories/edit/' + cat.id">
              <PencilSquareIcon class="w-5 text-slate-500 hover:text-slate-700" />
            </router-link>
            <a href=""> </a>
            <button @click="remove(cat)">
              <TrashIcon class="w-5 h-5 text-slate-500 hover:text-slate-700" />
            </button>
          </div>

        </article>

        <div class="pl-5">

          <article 
            v-for="(child, j) in cat.children"
            :key="j"
            class="flex justify-between px-5 py-3 bg-white rounded-lg border border-solid border-slate-200">

            <div class="flex items-center gap-x-2.5">
              <h3 v-text="child.name" class="text-lg" />
              <p
                :class="[
                  cat.status === 'drafted' ? 'text-slate-400' : 'text-green-600',
                  'text-xs uppercase font-semibold mt-1'
                ]"
                v-text="child.status"
              />
            </div>

            <div class="flex flex-wrap md:flex-nowrap items-start gap-2">
              <router-link :to="'/categories/edit/' + child.id">
                <PencilSquareIcon class="w-5 text-slate-500 hover:text-slate-700" />
              </router-link>
              <a href=""> </a>
              <button @click="remove(child)">
                <TrashIcon class="w-5 h-5 text-slate-500 hover:text-slate-700" />
              </button>
            </div>

            </article>

        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useCategoryStore } from '@/stores/category'
import Layout from '@/components/Layouts/DefaultLayout.vue'
import type CategoryType from '@/contracts/category.interface'

interface HierarchyType {
  id: string
  name: string
  slug: string
  description: string
  children?: Array<CategoryType>
  status: string
  created: Date
  modified: Date
}

const categoryStore = useCategoryStore()
const categories = ref()

onMounted(async () => {
  categories.value = await categoryStore.getHierarchy()
})

const remove = async (cat: CategoryType) => {
  const confirmation = confirm(`Are you sure you want to delete the category! \n "${cat.name}"`)

  if (confirmation) {
    await categoryStore.remove(cat.id!)
  }
}
</script>
