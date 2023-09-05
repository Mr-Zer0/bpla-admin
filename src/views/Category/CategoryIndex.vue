<template>
  <TopBar />
  <main class="mx-auto my-8 max-w-7xl px-2 sm:px-6 lg:px-8">
    <section class="bg-white mt-8 rounded-lg border border-solid border-slate-200">
      
      <article
        v-for="(cat, i) in categories"
        :key="i"
        :class="[i === categories.length - 1 ? '' : 'border-b border-solid border-slate-200', 'px-5 py-3 flex justify-between']"
      >

        <div class="flex items-center gap-x-2.5">
          <h3 v-text="cat.name" class="text-lg font-semibold" />
          <p
            :class="[cat.status === 'drafted' ? 'text-slate-400' : 'text-green-600', 'text-xs uppercase font-semibold mt-1']"
            v-text="cat.status"
          />
        </div>

        <div>
          <a href="#">
            <PencilSquareIcon class="w-6 text-slate-500 hover:text-slate-700" />
          </a>
        </div>

      </article>

    </section>
  </main>
</template>

<script setup lang="ts">
import TopBar from '../../components/TopBar.vue'
import { PencilSquareIcon } from '@heroicons/vue/24/outline';

import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

const categoryCollection = async () => {
  const querySnapshot = await getDocs(collection(db, 'category'))

  querySnapshot.forEach((doc) => {
    console.log(doc)
  })
}

categoryCollection()

const categories = [
  {
    name: 'Category Name 1',
    slug: 'category-name-1',
    status: 'published',
    description: 'The description for category name 1',
    created: '4 September 2023 at 10:18:15 UTC+6:30'
  },
  {
    name: 'Category Name 2',
    slug: 'category-name-2',
    status: 'drafted',
    description: 'The description for category name 2',
    created: '4 September 2023 at 10:18:15 UTC+6:30'
  },
  {
    name: 'Category Name 3',
    slug: 'category-name-3',
    status: 'published',
    description: 'The description for category name 3',
    created: '4 September 2023 at 10:18:15 UTC+6:30'
  }
]
</script>