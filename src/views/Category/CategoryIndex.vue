<template>
  <TopBar />
  <main class="mx-auto my-8 max-w-7xl px-2 sm:px-6 lg:px-8">
    <section class="bg-white mt-8 rounded-lg border border-solid border-slate-200">
      
      <article
        v-for="(cat, i) in categories"
        :key="i"
        :class="[i === categories.length - 1 ? '' : 'border-b border-solid border-slate-200', 'px-5 py-3']"
      >

        <div>
          <h3 v-text="cat.name" class="text-lg" />
          <div class="flex flex-row items-center gap-3 text-slate-500 mt-5 font-light">
            <CalendarIcon class="w-4 h-4" />
            <time datetime="{{ cat.created }}" class="text-sm">
              {{ cat.created }}
            </time>

            <TagIcon class="w-4 h-4 ml-4" />
            <p v-text="cat.status" class="text-sm" />
          </div>
        </div>

      </article>

    </section>
  </main>
</template>

<script setup lang="ts">
import TopBar from '../../components/TopBar.vue'

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