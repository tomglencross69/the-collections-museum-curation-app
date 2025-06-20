<template>
  <div
    v-if="visible"
    class="w-full sm:max-w-md bg-customYellow shadow-lg rounded-lg p-2 mt-5 z-50"
  >
    <div class="flex justify-between items-start">
      <h3 class="font-semibold text-lg">Using TheCollections</h3>
      <button @click="closeTooltip" class="text-gray-500 hover:text-black text-xl leading-none"><span class="text-xs">close </span>&times;</button>
    </div>
    <p class="mt-1 text-sm">
      Use the search bar to look for exhibits by keyword - filter with the tags below.
      <br>For example, you might search <b>The Portable Antiquities Scheme</b> with a keyword of <b>gold</b>, filtering results by the artefact type of <b>finger ring</b>.
      <br> Hit enter - or click the standing stones <span class="inline-flex items-center align-middle"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-5 h-5 text-gray-800 fill-current">
        <path d="M5 55h6V25H5v30zm12 0h6V25h-6v30zm12 0h6V39h-6v16zm12 0h6V25h-6v30zm12 0h6V25h-6v30zM6 19h52v6H6v-6z"/>
      </svg></span> - to search.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)
const emit = defineEmits(['dismiss'])

onMounted(() => {
  const dismissed = sessionStorage.getItem('searchTooltipDismissed')
  if (!dismissed) {
    visible.value = true
  }
})

function closeTooltip() {
  visible.value = false
  sessionStorage.setItem('searchTooltipDismissed', 'true')
  emit('dismiss')
}
</script>

<style scoped>

</style>
