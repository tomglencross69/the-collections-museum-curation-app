<template>
  <div class="border rounded-lg shadow-sm p-4 flex flex-col gap-2 bg-gray-100 min-h-[200px]">
    <img :src="item.imgURL" class="w-full h-40 object-cover rounded" />
    <div class="text-sm">
      <h3 class="font-semibold">{{ item.siteName }} ({{ item.period }})</h3>
      <p class="text-gray-600 italic">{{ item.county }} – {{ item.siteType }}</p>
      <p class="mt-1 text-xs text-gray-500">
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
