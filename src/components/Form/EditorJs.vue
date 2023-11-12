<template>
  <div :class="props.class">
    <slot name="label">
      <label
        v-if="props.label"
        :for="name"
        class="block text-sm font-medium leading-6 text-gray-900 font-semibold"
        v-text="props.label"
      />
    </slot>

    <slot name="editor"> </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  class?: string
  label?: string
}>()
</script>
