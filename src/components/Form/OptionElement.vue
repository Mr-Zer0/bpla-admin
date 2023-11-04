<template>
  <div
    :class="props.class"
  >
    <slot name="lable">

      <label
        v-if="props.label"
        :for="props.name" 
        class="block text-sm font-medium leading-6 text-gray-900 font-semibold"
        v-text="props.label"
      />

    </slot>

    <slot name="select">
      <div class="mt-2">
        <select
          :name="props.name"
          :required="props.required"
          :value="props.modelValue"
          @change="change"
          class="w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >

          <option disabled value="">Select a category</option>
          <option v-for="opt in props.options" :key="opt.value" :value="opt.value" v-text="opt.text" />

        </select>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    required?: boolean
    class?: string
    name: string
    label?: string
    modelValue?: string
    options: Array<{
      value: string
      text: string
    }>
  }>(),
  {
    required: false
  }
)

const emit = defineEmits(['update:modelValue'])

const change = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>