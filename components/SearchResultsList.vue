<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    <template v-if="selectedSearch === 'pas'">
      <PASCard v-for="item in items" :key="item.recordID" :item="item" />
    </template>
    <template v-else>
      <MPCard v-for="item in items" :key="item.recordID" :item="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PASCard from './PASCard.vue'
import MPCard from './MPCard.vue'

const props = defineProps<{
  items: any[]
  selectedSearch: 'pas' | 'mp'
}>()
console.log('items:', props.items)
</script>
