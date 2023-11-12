<template>
  <div :class="props.class">
    <slot name="label">
      <label
        v-if="props.label"
        for="content"
        class="block text-sm font-medium leading-6 text-gray-900 font-semibold"
        v-text="props.label"
      />
    </slot>

    <slot name="editor">
      <div class="mt-2 document-editor__editable-container">
        <ckeditor
          :editor="ClassicEditor"
          :value="props.modelValue"
          :config="ckconfig"
          @input="input"
        />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'

const ckeditor = CKEditor.component
const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<{
    class?: string
    label?: string
    modelValue?: string
    ckconfig?: object
  }>(),
  {
    ckconfig: () => {
      return {
        plugins: [EssentialsPlugin]
      }
    }
  }
)

const input = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
