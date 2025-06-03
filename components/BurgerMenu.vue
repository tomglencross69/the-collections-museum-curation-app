<template>
  <div ref="menuWrapper" class="relative pt-2">
    <!-- Toggle Button -->
    <button @click="toggleMenu" class="sm:hidden" ref="burgerButton" aria-expanded="isOpen.toString()" aria-controls="menuPanel" aria-label="Toggle menu">
      <div class="space-y-2 hover:space-y-1.5 transform transition-transform duration-200 hover:scale-[1.1]">
        <span class="block h-0.5 w-8 bg-black"></span>
        <span class="block h-0.5 w-8 bg-black"></span>
        <span class="block h-0.5 w-8 bg-black"></span>
      </div>
    </button>

    <!-- Menu Panel -->
    <div
      v-if="isOpen"
      id="menuPanel"
      class="absolute min-w-[210px] left-0 bg-customYellow shadow-lg rounded p-4 space-y-2 sm:hidden z-50"
      @mouseleave="closeMenu"
    >
      <a href="/" class="block text-gray-800 hover:text-black hover:font-semibold">Search</a>
      <a href="/saved-collections" class="block text-gray-800 hover:text-black hover:font-semibold">Your saved collections</a>
      <a href="/about" class="block text-gray-800 hover:text-black hover:font-semibold">About</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const menuWrapper = ref(null)
const burgerButton = ref(null)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function onClickOutside(event) {
  // If click outside close menu
  if (
    menuWrapper.value &&
    !menuWrapper.value.contains(event.target)
  ) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>
