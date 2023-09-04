<template>
  <main class="flex items-center justify-center min-h-screen">
    <form
      @submit.prevent="login"
      :class="[state.error ? 'shake' : '', 'w-full md:w-1/2 md:max-w-md mx-5 bg-white py-7 md:py-10 rounded-lg shadow space-y-6']"
    >
      <div class="px-7 md:px-10">
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

      <div class="px-7 md:px-10">
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

      <div
        v-if="state.error"
        class="bg-gray-100 py-5 px-7 md:px-10"
      >
        <p class="text-center flex justify-center text-gray-700">
          <ExclamationTriangleIcon class="w-6 mr-3 text-red-800" />
          {{ state.error }}
        </p>
      </div>

      <div class="flex justify-between px-7 md:px-10">
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

      <div class="px-7 md:px-10">
        <button
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
import { signIn } from '@/firebase/fireauth'
import router from '@/router';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { FirebaseError } from 'firebase/app'
import { reactive } from 'vue';

let email = ''
let password = ''

const state = reactive({ 
  error: ''
})

async function login() {
  state.error = ''

  try {

    await signIn(email, password)
    return router.push('/')

  } catch (error) {

    const code = error instanceof FirebaseError ? error.code : String(error)
    const message = error instanceof FirebaseError ? error.message : String(error)

    console.warn('Error : ', message)

    if (code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      state.error = 'Username or password is incorrect.'
    } else if (code === 'auth/too-many-requests') {
      state.error = 'Too many attemps.'
    } else {
      state.error = 'Authentication fail. Try Again.'
    }
    
  }
}
</script>

<style scope>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
