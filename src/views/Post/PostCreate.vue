<template>
  <Layout>
    <template v-slot:title>
      <h3 class="text-2xl font-semibold text-slate-700">Create Post</h3>
    </template>

    <FormComponent />
  </Layout>
</template>

<script setup lang="ts">
import FormComponent from '@/components/Posts/FormComponent.vue'
import Layout from '@/components/Layouts/DefaultLayout.vue'
</script>
