<template>
  <div class="border rounded-lg shadow-sm p-4 flex flex-col gap-2 bg-gray-100 min-h-[200px]">
    <img :src="item.imgURL || 'https://placehold.co/600x400'" class="w-full h-40 object-cover rounded" />
    <div class="text-sm">
      <h3 class="font-semibold">{{ item.objectType }} ({{ item.broadPeriod }})</h3>
      <p class="text-gray-600 italic">{{ item.county }}</p>
      <p class="mt-1">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: {
    recordID: number
    objectType: string
    broadPeriod: string
    county: string
    description: string
    imgURL: string
  }
}>()
</script>
