<template>
  <nav class="hidden sm:flex gap-6 font-semibold px-1 py-2 text-xl"
  aria-label="Main navigation">
    <router-link
      v-for="(item, index) in navItems"
      :key="index"
      :to="item.to"
      class="cursor-pointer hover:underline"
      active-class="underline"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = computed(() => {
  const items = [
    { label: 'Search', to: '/?search=pas' },
    { label: 'Your Saved Collections', to: '/saved-collections' },
    { label: 'About', to: '/about' }
  ]

  if (route.path.startsWith('/search-results/individual-item')) {
    items.unshift({ label: 'Back to Search', to: '/search-results' })
  }
  return items
})

</script>
<style lang="css" scoped>

</style>