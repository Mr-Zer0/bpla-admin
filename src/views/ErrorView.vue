<template>
  <main class="w-100 min-h-screen bg-slate-100 flex flex-col gap-5 items-center justify-center">
    <p class="text-indigo-600 text-xl tracking-wider">
      404
    </p>
    <h1 class="text-5xl tracking-wider font-semibold text-center">
      Page not found
    </h1>
    <p class="text-slate-500">
      The page you are trying to access does not exist.
    </p>

    <div class="mt-14">
      <router-link to="/" class="hover:text-indigo-600 flex gap-3">
        Go home
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </router-link>
    </div>
  </main>
</template>

