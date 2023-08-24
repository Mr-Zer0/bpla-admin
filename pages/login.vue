<template>
  <main class="bg-slate-100 h-screen flex items-center justify-center">
    <form @submit.prevent="login" class="w-full md:w-1/2 md:max-w-md mx-5 bg-white p-7 md:p-10 rounded-lg shadow space-y-6">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div class="mt-2">
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <div class="mt-2">
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div class="flex justify-between">
        <div class="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            class="w-4 h-4 rounded"
            checked
          >
          <label for="remember" class="ml-2 text-sm">
            Remember Me
          </label>
        </div>

        <div>
          <a class="text-sm font-medium" href="#">Forgot Password?</a>
        </div>
      </div>

      <div>
        <button
          @click="login"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { signIn, signOut } from '@/composables/useFireauth'

definePageMeta({
  layout: 'plain'
})

let email = ''
let password = ''

const login = async () => { await signIn(email, password) }
</script>
