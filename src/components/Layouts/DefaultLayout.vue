<template>
  <TopBar />

  <main class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-8">
    <section v-if="props.enable_title" class="flex justify-between items-center">
      <slot name="title" />
    </section>
    <slot />
  </main>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'

const props = withDefaults(defineProps<{
  enable_title: boolean
}>(), {
  enable_title: () => true
})
</script>
