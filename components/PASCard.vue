<template>
  <div class="exhibit-wrapper flex flex-col gap-2 ">
    <img :src="item.imgURL || 'https://placehold.co/600x400'" class="exhibit-image w-full h-40 object-coverrounded px-2" />
    <div class="exhibit-card-text p-1 text-sm sm:text-base bg-customYellow rounded-b-lg h-full">
      <h3 class="font-semibold">{{ item.objectType }} ({{ item.broadPeriod }})</h3>
      <p class="text-gray-600 italic">{{ item.county }}</p>
      <p class="mt-1">{{ truncatedDescription }}</p>
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

const truncatedDescription = computed(() => {
  const words = props.item.description.split(' ')
  return words.length > 10
    ? words.slice(0, 10).join(' ') + '...'
    : props.item.description
})
</script>
