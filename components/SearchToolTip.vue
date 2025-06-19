<template>
  <div
    v-if="visible"
    class="w-full sm:max-w-md bg-customYellow shadow-lg rounded-lg p-2 mt-5 z-50"
  >
    <div class="flex justify-between items-start">
      <h3 class="font-semibold text-lg">Using TheCollections</h3>
      <button @click="closeTooltip" class="text-gray-500 hover:text-black text-xl leading-none">&times;</button>
    </div>
    <p class="mt-1 text-sm">
      Search either artefacts from The Portable Antiquities Scheme or records from Europeana. <br>
      Use the search bar to look for exhibitions by keyword. 
      <br> You can also filter with the tags below - the default is <i>All</i> results.
      <br> Hit enter or click the standing stones to search.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  const dismissed = sessionStorage.getItem('searchTooltipDismissed')
  if (!dismissed) {
    visible.value = true
  }
})

function closeTooltip() {
  visible.value = false
  sessionStorage.setItem('searchTooltipDismissed', 'true')
}
</script>

<style scoped>

</style>
