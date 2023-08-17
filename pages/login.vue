<template>
  <main class="bg-slate-100 h-screen flex items-center justify-center">
    <div class="w-full md:w-1/2 md:max-w-md mx-5 bg-white p-7 md:p-10 rounded-lg shadow">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="flex justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              class="w-4 h-4 rounded"
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
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
definePageMeta({
  layout: false
})
export default {
  mounted() {
    setPageLayout('plain')
  }
}
</script>
