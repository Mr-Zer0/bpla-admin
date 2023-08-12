<template>
  <div class="bg-gray-100" id="bpla">
    <TopBar />

    <NuxtPage/>
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
