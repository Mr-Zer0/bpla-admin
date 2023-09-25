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
      v-for="(cat, i) in categories"
      :key="i"
      :class="[i === categories.length - 1 ? '' : 'border-b border-solid border-slate-200', 'px-5 py-3 flex justify-between']"
    >

      <div class="flex items-center gap-x-2.5">
        <h3 v-text="cat.name" class="text-lg" />
        <p
          :class="[cat.status === 'drafted' ? 'text-slate-400' : 'text-green-600', 'text-xs uppercase font-semibold mt-1']"
          v-text="cat.status"
        />
      </div>

      <div>
        <a href="#">
          <PencilSquareIcon class="w-5 text-slate-500 hover:text-slate-700" />
        </a>
      </div>

    </article>

  </section>

</template>

<script setup lang="ts">
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { getAll } from '@/firebase/firestore'
import type CategoryContract from '@/contracts/category.interface'
import { onMounted, ref } from 'vue';

const categories = ref<Array<CategoryContract>>([])

onMounted(async () => {
  const querySnapshot = await getAll('category')

  querySnapshot.forEach((doc) => {
    const data = doc.data()

    categories.value.push({
      name: data.name,
      slug: data.slug,
      description: data.description,
      status: data.status,
      created: data.created,
      modified: data.modified
    })
  })
})

</script>