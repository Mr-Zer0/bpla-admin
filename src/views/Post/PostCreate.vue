<template>
  <TopBar />

  <div class="test">a</div>

  <main class="mx-auto my-9 max-w-7xl px-2 sm:px-6 lg:px-8">

    <section>
      <h3 class="text-3xl font-semibold text-slate-700">Create New Post</h3>
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">

      <form action="#">

        <div class="col-span-full">
          <label 
            for="title" 
            class="block text-sm font-medium leading-6 text-slate-700"
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
            class="block text-sm font-medium leading-6 text-slate-700"
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

        <div class="col-span-full mt-5">
          <label 
            for="excerpt" 
            class="block text-sm font-medium leading-6 text-slate-700"
          >
            Post Excerpt
          </label>
          <div class="mt-2">
            <textarea
              name="excerpt"
              id="excerpt"
              rows="3"
              v-model="excerpt"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            </textarea>
          </div>
        </div>

        <div class="col-span-full mt-5">
          <label 
            for="content" 
            class="block text-sm font-medium leading-6 text-slate-700"
          >
            Post Content
          </label>
          <div class="mt-2 document-editor__editable-container">
            <ckeditor :editor="ClassicEditor" v-model="content" :config="ckConfig"></ckeditor>
          </div>
        </div>

      </form>

    </section>

  </main>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'

let title = ''
let slug = ''
let excerpt = ''
let category = ''
let content = '<p>This is the content</p>'

const ckeditor = CKEditor.component

const ckConfig = {}

</script>

<style lang="scss">
.ck-content {
  h1, h2, h3, h4 {
    color: #ee382a;
  }
  h1 {
    font-size: calc(1.375rem + 1.5vw);
  }
  h2 {
    font-size: calc(1.325rem + 0.9vw);
  }
  h3 {
    font-size: calc(1.3rem + 0.6vw);
  }
  h4 {
    font-size: calc(1.275rem + 0.3vw);
  }
}
</style>