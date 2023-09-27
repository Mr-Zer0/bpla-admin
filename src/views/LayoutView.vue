<template>
  <TopBar />

  <main class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-8">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
</script>
