<script setup lang="ts">
import {
  PencilSquareIcon,
  SquaresPlusIcon,
  RectangleStackIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'

const actions = [
  {
    icon: PencilSquareIcon,
    name: 'New Post',
    description: 'Create a new article for the website',
    link: '/posts/create'
  },
  {
    icon: SquaresPlusIcon,
    name: 'New Category',
    description: 'Make a new category to group your articles',
    link: '/categories/create'
  },
  {
    icon: RectangleStackIcon,
    name: 'Add Gallery',
    description: 'Manage photo gallery to get engagement from public',
    link: '#'
  },
  {
    icon: WrenchScrewdriverIcon,
    name: 'Make Changes',
    description: 'Tune the system to get the best experience.',
    link: '#'
  }
]
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-4 gap-5">
    <router-link
      v-for="(action, i) in actions"
      :key="i"
      :to="action.link"
      class="border border-solid border-slate-300 rounded-lg bg-white p-4 hover:bg-white/[.75] text-slate-600 hover:text-slate-800"
    >
      <component :is="action.icon" class="w-7 h7" />
      <h5 v-text="action.name" class="font-bold mt-5" />
      <p v-text="action.description" class="text-sm mt-2" />
    </router-link>
  </section>
</template>
