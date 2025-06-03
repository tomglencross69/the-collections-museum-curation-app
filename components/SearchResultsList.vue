<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
    <template v-if="selectedSearch === 'pas'">
      <PASCard v-for="item in items" :key="item.recordID" :item="item" />
    </template>
    <template v-else>
      <EURCard v-for="item in items" :key="item.recordID" :item="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PASCard from './PASCard.vue'
import EURCard from './EURCard.vue'

const props = defineProps<{
  items: any[]
  selectedSearch: 'pas' | 'eur' | string
}>()

</script>
