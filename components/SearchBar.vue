<template>
  <div class="w-full flex items-center my-2 border-2 border-black rounded-lg px-1 bg-white shadow-md">
    <input
      type="text"
      class="flex-grow px-1 py-2 text-lg focus:outline-none"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="emit('search')"
      :placeholder="placeholder"
    />

    <button @click="$emit('search')" class="p-2 ml-2 rounded hover:bg-gray-100 transition">
      <!-- Custom Stonehenge SVG Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-8 h-8 text-gray-800 fill-current">
        <path d="M5 55h6V25H5v30zm12 0h6V25h-6v30zm12 0h6V39h-6v16zm12 0h6V25h-6v30zm12 0h6V25h-6v30zM6 19h52v6H6v-6z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()
const emit = defineEmits(['update:modelValue', 'search'])
</script>

<style scoped>
input::placeholder {
  color: #999;
}
</style>
