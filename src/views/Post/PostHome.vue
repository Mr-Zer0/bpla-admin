<template>
  <TopBar />

  <main class="mx-auto my-9 max-w-7xl px-2 sm:px-6 lg:px-8">

    <section class="flex justify-between items-center">

      <h3 class="text-3xl font-semibold">Posts</h3>

      <router-link
        to="/posts/create"
        class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create
      </router-link>

    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200">

      

    </section>

  </main>

</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
</script>