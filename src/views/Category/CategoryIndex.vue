<template>
  <TopBar />

  <main class="mx-auto my-8 max-w-7xl px-2 sm:px-6 lg:px-8">

    <button @click="create()">Add New</button>

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
import { add, getAll } from '@/firebase/firestore'
import type CategoryContract from '@/contracts/category.interface'
import { onMounted, ref } from 'vue';

const categories = ref<Array<CategoryContract>>([])

const create = async (): Promise<void> => {
  const result = await add(
    'category',
    {
      name: 'Messages',
      slug: 'messages',
      description: 'All about messages from BPLA',
      status: 'drafted'
    }
  )

  console.log(result)
}

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