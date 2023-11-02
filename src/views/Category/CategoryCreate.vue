<template>
  <Layout>
    <section>
      <h3 class="text-3xl font-semibold">Create New Category</h3>
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
      <FormComponent />
    </section>

  </Layout>
</template>

<script setup lang="ts">
import FormComponent from '@/components/Categories/FormComponent.vue'
</script>
