<template>
  <div class="max-w-3xl mx-auto p-4">
    <div v-if="item">
      <h1 class="text-2xl font-bold mb-4">{{ item.title || item.name }}</h1>
      <img v-if="item.image" :src="item.image" class="mb-4" />
      <p v-if="item.description">{{ item.description }}</p>
    </div>
    <div v-else class="text-gray-500">No item found.</div>
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