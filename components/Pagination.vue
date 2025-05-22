<template>
  <div class="flex justify-center gap-4 my-4 items-center">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-3 py-1 border border-black rounded bg-white hover:bg-gray-100 transition disabled:opacity-50"
    >
      Previous
    </button>

    <span class="font-semibold text-sm sm:text-base">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="px-3 py-1 border border-black rounded bg-white hover:bg-gray-100 transition disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

function changePage(newPage: number) {
  if (newPage < 1 || newPage > props.totalPages) return
  emit('update:page', newPage)
}
</script>
