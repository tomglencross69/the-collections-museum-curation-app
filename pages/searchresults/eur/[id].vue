<template>
    <button
    class="text-xl font-semibold hover:underline mb-1"
    @click="$router.back()"
  >
    ← Back to search
  </button>

   <!-- Responsive Layout Container -->
  <div class="flex flex-col sm:flex-row gap-1 max-w-6xl mx-auto">
  <div class="max-w-3xl mx-auto p-4">
    <div v-if="item">
      <h1 class="text-2xl font-bold mb-4">{{ item.title[0][0].toUpperCase()+item.title[0].slice(1) || item.name }}</h1>
      <img v-if="item.edmPreview" :src="item.edmPreview" class="mb-4" />
      <h2><b>Description: </b>{{ item.dcDescriptionLangAware.en[0] }}</h2>
      <h2><b>Collection: </b>{{ item.dataProvider[0] }}</h2>
      <h2><b>Type: </b>{{ item.type[0] + item.type.slice(1).toLowerCase()  || 'Not specified' }} </h2>
      <h2><b>Year of archive: </b>{{ item.year?.[0] || 'n/a' }}</h2>
      <h2><b>Provided by: </b>{{ item.provider[0] || 'Not specified' }}  </h2>
    </div>
    <div v-else class="text-gray-500">No item found.</div>
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
</script>