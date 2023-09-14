<template>
  <TopBar />

  <main class="mx-auto my-9 max-w-7xl px-2 sm:px-6 lg:px-8">

    <section>
      <h3 class="text-3xl font-semibold">Create New Post</h3>
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">

      <form action="#">

        <div class="col-span-full">
          <label 
            for="title" 
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Post Title
          </label>
          <div class="mt-2">
            <input 
              v-model="title"
              type="text" 
              name="title" 
              id="title"
              required
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div class="col-span-full mt-5">
          <label 
            for="slug" 
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Slug
          </label>
          <div class="mt-2">
            <input 
              v-model="slug"
              type="text" 
              name="slug" 
              id="slug"
              required
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

      </form>

    </section>

  </main>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'

let title = ''
let slug = ''
let excerpt = ''
let category = ''
let body = ''

</script>