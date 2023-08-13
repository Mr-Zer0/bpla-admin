<template>
  <section>
    <ul class="flex gap-3 items-center">
      <li>
        <nuxt-link to="/" class="text-sm">
          <HomeIcon class="w-5 h-5 text-slate-500 hover:text-slate-700" />
        </nuxt-link>
      </li>
      <li 
        v-for="(crumb, i) in crumbs" 
        :key="i"
        class="flex items-center gap-3"
      >
      <svg class="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
      </svg>

        <nuxt-link 
          :to="crumb.path"
          v-text="crumb.name"
          class="text-sm text-slate-500 hover:text-slate-700"
        />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    HomeIcon
  },
  computed: {
    crumbs () {
      const match = this.$route.matched

      const result = match.map((item, index, arr) => {
        let name: string[] = []

        if(item.name) {
          name = (item.name as String).split('-').map((item) => {
            return item[0].toUpperCase() + item.substring(1)
          })
        }

        return {
          name: name.join(' '),
          path: item.path
        }
      })

      return result
    }
  }
}
</script>