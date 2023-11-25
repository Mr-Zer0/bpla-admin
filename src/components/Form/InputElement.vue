<template>
  <div>
    <slot name="label">
      <label
        v-if="props.label"
        :for="name"
        class="block text-sm font-medium leading-6 text-gray-900 font-semibold"
        v-text="props.label"
      />
    </slot>

    <slot name="body">
      <div class="mt-2">
        <input
          :name="name"
          :type="type"
          :value="props.modelValue"
          :required="props.required"
          @input="input"
          class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    required?: boolean
    modelValue?: string
    type?: string
    name?: string
    placeholder?: string
  }>(),
  {
    required: false,
    type: 'text'
  }
)

const emit = defineEmits(['update:modelValue'])

const input = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
