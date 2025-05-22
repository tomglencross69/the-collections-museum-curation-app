<template>
  <div class="exhibit-wrapper flex flex-col gap-2">
    <img
      v-if="item.edmPreview?.[0]"
      :src="item.edmPreview[0]"
      class="exhibit-image w-full object-cover rounded px-2"
      :alt="item.title?.[0] || 'Europeana item'"
    />
    <div class="exhibit-card-text p-1 text-sm sm:text-base bg-customYellow rounded-b-lg h-full">
      <h3 class="font-semibold">
        {{ item.title?.[0] || 'Untitled' }}
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
const props = defineProps<{
  item: any
}>()
</script>
