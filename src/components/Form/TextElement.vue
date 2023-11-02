<template>
  <div
    :class="[props.class ? props.class + ' ' : '', 'col-span-full']"
  >

    <label
      :for="name" 
      class="block text-sm font-medium leading-6 text-gray-900 font-semibold"
      v-text="props.label"
    />

    <div class="mt-2">
      <textarea
        :name="name" 
        :cols="props.cols" 
        :rows="props.rows"
        :value="props.modelValue"
        @input="input"
        class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  required?: boolean
  modelValue?: string
  name?: string
  class?: string
  cols?: number
  rows?: number
}>(), {
  required: false,
  rows: 4
})

const emit = defineEmits(['update:modelValue'])

const input = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>