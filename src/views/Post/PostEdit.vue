<template>
  <Layout>
    <FormComponent :uid="uid" />
  </Layout>
</template>

<script setup lang="ts">
import FormComponent from '@/components/Posts/FormComponent.vue'
import { useRoute } from 'vue-router'
import Layout from '@/components/Layouts/DefaultLayout.vue'

const routeCompose = useRoute()

let uid = routeCompose.params.id.toString()
</script>
