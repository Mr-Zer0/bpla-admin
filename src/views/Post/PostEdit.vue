<template>
  <Layout>
    <template v-slot:title>
      <h3 class="text-2xl font-semibold text-slate-700">Edit Post</h3>
    </template>

    <FormComponent :uid="uid" type="edit" />
  </Layout>
</template>

<script setup lang="ts">
import FormComponent from '@/components/Posts/FormComponent.vue'
import { useRoute } from 'vue-router'
import Layout from '@/components/Layouts/DefaultLayout.vue'

const routeCompose = useRoute()

let uid = routeCompose.params.id.toString()
</script>
