<template>
  <div class="exhibit-wrapper flex flex-col gap-2">
    <img
      :src="imageUrl || 'https://placehold.co/600x400'"
      class="exhibit-image w-full h-40 object-cover rounded px-2"
      alt="Artifact image"
      loading="lazy"
    />
    <div class="exhibit-card-text p-1 text-sm sm:text-base bg-customYellow rounded-b-lg h-full">
      <h3 class="font-semibold">{{ item.objecttype }} ({{ item.broadperiod }})</h3>
      <p class="text-gray-600 italic">{{ item.county }}</p>
      <p class="mt-1">{{ truncatedDescription }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  item: {
    id: number | string
    objecttype: string
    broadperiod: string
    county: string
    description: string
    imagedir?: string
    filename?: string
  }
}>()

const imageUrl = computed(() =>
  props.item.imagedir && props.item.filename
    ? `https://finds.org.uk/${props.item.imagedir}${props.item.filename}`
    : ''
)

const truncatedDescription = computed(() => {
  if (!props.item.description) return ''
  const words = props.item.description.split(' ')
  return words.length > 10
    ? words.slice(0, 10).join(' ') + '...'
    : props.item.description
})
</script>
