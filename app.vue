<template>
  <NuxtLayout>

    <NuxtPage />

  </NuxtLayout>
</template>


<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '@/store/user';

onMounted(() => {
  const userStore = useUserStore()

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      userStore.authenticate(user)
    } else {
      userStore.unauthenticate()
    }
  })
})

</script>
