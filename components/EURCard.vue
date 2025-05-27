<template>
  <div 
  @click="goToItem"
  class="exhibit-wrapper flex flex-col gap-2">
    <img
      v-if="item.edmPreview?.[0]"
      :src="item.edmPreview[0]"
      class="exhibit-image w-full min-h-[200px] object-cover rounded px-2"
      :alt="item.title?.[0] || 'Europeana item'"
    />
    <div class="exhibit-card-text p-1 text-sm sm:text-base bg-customYellow rounded-b-lg h-full">
      <h3 class="font-semibold">
        {{ item.title[0][0].toUpperCase()+item.title[0].slice(1) || 'Untitled' }}
      </h3>
      <p class="text-gray-600 italic">
        {{ item.dataProvider?.[0] || 'Unknown collection' }}
      </p>
      <p class="mt-1 text-xs sm:text-sm text-gray-500 truncate">
        Type: {{ item.type || 'Not specified' }} | Year: {{ item.year?.[0] || 'n/a' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">


import { useRouter } from 'vue-router'
import { useItemsStore } from '@/stores/items'

const router = useRouter()
const store = useItemsStore()
const props = defineProps<{
  item: any
}>()
console.log('EUR item:', props.item)

const goToItem = () => {
  store.setSelectedItem(props.item)

  const rawId = props.item.id
  if (!rawId || typeof rawId !== 'string') {
    console.warn('Invalid or missing item.id in EURCard:', props.item)
    return
  }

  const cleanId = rawId.replace(/^\//, '') 
  router.push(`/searchresults/eur/${encodeURIComponent(cleanId)}`)
}

</script>
