<template>
  <div class="bg-slate-100" id="bpla">
    <TopBar />
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    const bpla_element = document.getElementById('bpla')

    if (bpla_element != null) {
      bpla_element.style.minHeight = window.innerHeight + 'px'
    }
  }
}
</script>
