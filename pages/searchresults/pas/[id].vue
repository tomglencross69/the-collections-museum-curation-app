<template>
  <button
  class="text-xl font-semibold hover:underline" @click="$router.back()">← Back</button>
  <div class="my-2 max-w-xl mx-auto p-4 bg-customYellow">
    <div v-if="item">
      <h1 class="text-2xl font-bold mb-4">{{ item.objecttype[0]+item.objecttype.slice(1).toLowerCase() }} ({{  item.broadperiod[0]+item.broadperiod.slice(1).toLowerCase()  }})</h1>
      <img v-if="imageUrl" :src="imageUrl || 'https://placehold.co/600x400'" class="mb-4" />
      <h2><b>Material:</b> {{item.materialTerm }}</h2>
      <h2><b>Period:</b> {{ item.broadperiod[0]+item.broadperiod.slice(1).toLowerCase() }}</h2>
      <h2><b>County:</b> {{ item.county }}</h2>
      <p v-if="item.description"><b>Description: </b>{{ decodedDescription }}</p>
    </div>
    <div v-else class="text-gray-500">No item found.</div>
  </div>

  <!-- ADD TO YOUR COLLECTION -->
   <div class='max-w-xl mx-auto py-2 flex flex-col gap-4'>Add to your collection</div>

  <!-- TAGS AND CURRENTLY SEARCHING -->
<div class="max-w-xl mx-auto py-2 flex flex-col gap-4">
  <!-- Tags Section -->
  <div>
    <h2 >Tags:</h2>
    <div class="flex gap-2 flex-wrap mt-1">
      <div
        v-for="tag in store.pasSearchContext.tags"
        :key="tag"
        class="px-2 py-1 text-xs text-white bg-black sm:text-base border border-black rounded"
      >
        {{ tag }}
      </div>
    </div>
  </div>

  <!-- Currently Searching Section -->
  <div>
    <h2 >Currently Searching:</h2>
    <div class="flex gap-2 flex-wrap mt-1">
      <div class="px-2 py-1 text-xs text-white bg-black sm:text-base border border-black rounded">
        Portable Antiquities Scheme
      </div>
      <div class="px-2 py-1 text-xs sm:text-base border border-black rounded">
        Europeana
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import { useItemsStore } from '@/stores/items'
import { useRoute } from 'vue-router'
const store = useItemsStore()
const route = useRoute()


const item = computed(() => {
  if (store.selectedItem) return store.selectedItem
  const id = route.params.id
  return store.items.find(i => i.id == id || i._id == id || i.identifier == id)
})

function decodeHTMLEntities(str: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

const decodedDescription = computed(() =>
  decodeHTMLEntities(item.value.description)
)

const imageUrl = computed(() =>
  item.value.imagedir && item.value.filename
    ? `https://finds.org.uk/${item.value.imagedir}${item.value.filename}`
    : ''
)

console.log(item, "<<<item in PAS")
</script>