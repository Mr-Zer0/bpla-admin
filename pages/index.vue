<template>
  <main class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-8">
    
    <section class="grid grid-cols-2 md:grid-cols-4 gap-5">
      <a
        v-for="(action, i) in actions"
        :key="i"
        href="#"
        class="border border-solid border-gray-300 rounded-lg bg-white p-4 hover:bg-white/[.75] text-slate-600 hover:text-slate-800"
      >
        <component :is="action.icon" class="w-7 h7" />
        <h5 v-text="action.name" class="font-bold mt-5" />
        <p v-text="action.description" class="text-sm mt-2" />
      </a>
    </section>

  </main>
</template>

<script lang="ts">
import { 
  PencilSquareIcon, 
  SquaresPlusIcon, 
  RectangleStackIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/vue/24/outline'

export default {
  components: {
    PencilSquareIcon,
    SquaresPlusIcon,
    RectangleStackIcon,
    WrenchScrewdriverIcon
  },
  data() {
    return {
      actions: [
        {
          icon: PencilSquareIcon,
          name: 'New Post',
          description: 'Create a new article for the website',
          link: '#'
        },
        {
          icon: SquaresPlusIcon,
          name: 'New Category',
          description: 'Make a new category to group your articles',
          link: '#'
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
    }
  }
}
</script>