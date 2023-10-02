<template>
  <FormComponent :uid="uid" />
</template>

<script setup lang="ts">
import FormComponent from '@/components/Posts/FormComponent.vue'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post'

import type PostType from '@/contracts/post.interface'

const routeCompose = useRoute()

let uid = routeCompose.params.id.toString()

const routerCompose = useRouter()
const postStore = usePostStore()

const post = ref<PostType>()

onMounted(async () => {
  const result = await postStore.getOne(routeCompose.params.id.toString())

  if (!result) { routerCompose.push({ name: 'NotFound' }) }

  post.value = result
})
</script>