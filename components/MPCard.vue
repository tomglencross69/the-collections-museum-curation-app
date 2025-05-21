<template>
  <div class="exhibit-wrapper flex flex-col gap-2 ">
    <img :src="item.imgURL" class="exhibit-image w-full object-cover rounded px-2" />
    <div class="exhibit-card-text p-1 text-sm sm:text-base bg-customYellow rounded-b-lg h-full">
      <h3 class="font-semibold">{{ item.siteName }} ({{ item.period }})</h3>
      <p class="text-gray-600 italic">{{ item.county }} – {{ item.siteType }}</p>
      <p class="mt-1 text-xs sm:text-sm text-gray-500">
        Condition: {{ item.condition }} | Ambience: {{ item.ambience }} | Access: {{ item.access }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: {
    recordID: number
    siteName: string
    period: string
    county: string
    siteType: string
    condition: number
    ambience: number
    access: number
    imgURL: string
  }
}>()
</script>
