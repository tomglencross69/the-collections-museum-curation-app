<template>
  <header class="font-sans py-3" role="banner">
    
    <!-- Top row: burger + heading + usericon -->
   <div class="flex items-center relative z-10 gap-4">
    <nav aria-label="Main navigation">
  <BurgerMenu />
  </nav>
  <NuxtLink to="/" class="flex-1" aria-label="Go to homepage">
    <h1 class="header text-center sm:text-left gleaming-text">
      TheCollections
    </h1>
  </NuxtLink>
  <a href="/account" aria-label="Your account">
    <span class="sr-only">Account</span>
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

.gleaming-text {
  position: relative;
  cursor: pointer;
  background: linear-gradient(to right, currentColor 20%, theme('colors.customYellow') 40%, theme('colors.customYellow') 60%, currentColor 80%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-position: -250% center;
  transition: background-position 3s ease;
}

.gleaming-text:hover {
  background-position: 200% center;
}
</style>


