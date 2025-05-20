<template>
  <div class="relative pt-2">
    <!-- Toggle Button -->
    <button @click="isOpen = !isOpen" class="sm:hidden">
      <div class="space-y-2">
        <span class="block h-0.5 w-8 bg-black"></span>
        <span class="block h-0.5 w-8 bg-black"></span>
        <span class="block h-0.5 w-8 bg-black"></span>
      </div>
    </button>

    <!-- Menu Panel -->
    <div
      v-if="isOpen"
      class="absolute min-w-max left-0 bg-customYellow shadow-lg rounded p-4 space-y-2 sm:hidden z-50"
    >
      <a href="#" class="block text-gray-800 hover:text-black">Search</a>
      <a href="#" class="block text-gray-800 hover:text-black">Your saved collections</a>
      <a href="#" class="block text-gray-800 hover:text-black">About</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
