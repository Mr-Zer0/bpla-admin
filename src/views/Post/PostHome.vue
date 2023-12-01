<template>
  <Layout>
    <template v-slot:title>
      <h3 class="text-2xl font-semibold">Posts</h3>

      <router-link
        to="/posts/create"
        class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create
      </router-link>
    </template>

    <section class="mt-8 flex flex-row gap-6">
      <!-- <button
        :class="[
          current === 'all' ? 'rounded-full border border-red-600 bg-red-500 text-white' : '',
          'px-5 py-1'
        ]"
        @click="filter('all')"
        v-text="'All'"
      /> -->

      <button
        v-for="(cat, i) in categories"
        :key="i"
        :class="[
          current === cat.slug ? 'rounded-full border border-red-600 bg-red-500 text-white' : '',
          'px-5 py-1'
        ]"
        @click="filter(cat.slug)"
        v-text="cat.name"
      />
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200">
      <article
        v-for="(post, i) in posts"
        :key="post.id"
        :class="[
          i === postStore.count - 1 ? '' : 'border-b border-solid border-slate-200',
          'px-5 py-3 flex justify-between'
        ]"
      >
        <div>
          <h3 v-text="post.title" class="text-lg" />
          <div class="flex flex-row items-center gap-3 text-slate-500 mt-5 font-light">
            <CalendarIcon class="w-4 h-4" />
            <time datetime="{{ post.created }}" class="text-sm">
              {{ new Intl.DateTimeFormat('en-US').format(post.published) }}
            </time>

            <TagIcon class="w-4 h-4 ml-4" />
            <p v-text="post.category.name" class="text-sm" />

            <PuzzlePieceIcon class="w-4 h-4 ml-4" />
            <p class="text-sm" v-text="post.status" />
          </div>
        </div>

        <div class="flex flex-wrap md:flex-nowrap items-start gap-2">
          <router-link :to="'/posts/edit/' + post.id">
            <PencilSquareIcon class="w-5 h5 text-slate-500 hover:text-slate-700" />
          </router-link>
          <button>
            <TrashIcon class="w-5 h-5 text-slate-500 hover:text-slate-700" />
          </button>
        </div>
      </article>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post'
import { onMounted, ref } from 'vue'
import {
  CalendarIcon,
  TagIcon,
  PuzzlePieceIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import Layout from '@/components/Layouts/DefaultLayout.vue'

import type PostType from '@/contracts/post.interface'
import type CategoryType from '@/contracts/category.interface'
import { useCategoryStore } from '@/stores/category'

const postStore = usePostStore()
const categoryStore = useCategoryStore()
const posts = ref<Array<PostType>>()
const categories = ref<Array<CategoryType>>()
const current = ref('')

onMounted(async () => {
  categories.value = await categoryStore.getRoots()

  filter(categories.value[0].slug)
})

const filter = async (cur: string) => {
  if (cur !== 'all') {
    posts.value = await postStore.getByCategory(cur)
  }

  current.value = cur
}
</script>
