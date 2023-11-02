<template>
  <Layout>
    <section>
      <h3 class="text-3xl font-semibold">Create New Category</h3>
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200 p-7">
      <FormComponent
        type="update"
        :categoryId="$route.params.id.toString()"
      />
    </section>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layouts/DefaultLayout.vue'
import FormComponent from '@/components/Categories/FormComponent.vue'
</script>
