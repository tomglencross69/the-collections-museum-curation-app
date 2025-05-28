<template>
  <header class="font-sans py-3">
    <!-- Top row: burger + heading + usericon -->
   <div class="flex items-center relative z-10 gap-4">
  <BurgerMenu />
  <NuxtLink to="/" class="flex-1">
    <h1 class="header text-center sm:text-left">
      TheCollections
    </h1>
  </NuxtLink>
  <a href="/account">
    <UserIcon />
  </a>
</div>


    <!-- Subheading below -->
    <h2 class="subheader mt-2 mr-20">
      Search over 60 million records and 100,000 archaeological finds.
    </h2>
  </header>
</template>


<script setup lang="ts">
import { useItemsStore } from '@/stores/items'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const store = useItemsStore()
const route = useRoute()

watch(() => route.fullPath, (newPath) => {
  if (newPath === '/') {
    store.setSearchContext({ query: '', tags: [], page: 1, source: 'pas' })
    store.setSearchContext({ query: '', tags: [], page: 1, source: 'eur' })
  }
})


</script>

<style lang="css" scoped>
.header-wrapper {
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.header {
font-size: clamp(2rem, 6vw, 5rem);
line-height: 0.9;
}

.subheader {
    font-size: clamp(1.2rem, 3vw, 3rem);
    line-height: 1.2;
}
</style>


