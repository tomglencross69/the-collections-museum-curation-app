<template>
 
<div class="wrapper">

    <!-- Saved Collection Toggle -->
     <div class="saved-collection-toggle-wrapper sm:text-xl">
    <span class="saved-collection-text">Your saved collection from:</span>
    <div class="collection-buttons flex gap-x-2">
      <button
      @click="selectedCollection = 'pas'"
      :class="[
        'px-2 py-1 my-1 border border-black text-left text-sm sm:text-lg rounded min-w-[50px] whitespace-nowrap', 
        selectedCollection === 'pas' ? 'bg-black text-white' : 'bg-white text-black']">
        The Portable Antiquities Scheme
      </button>
      <button
      @click="selectedCollection = 'eur'"
      :class="[
        'px-2 py-1 my-1 border border-black text-left text-sm sm:text-lg rounded whitespace-nowrap min-w-[50px]', 
        selectedCollection === 'eur' ? 'bg-black text-white' : 'bg-white text-black'
        ]">
        Europeana
      </button>
    </div>
  </div>

  <!-- Gallery list -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
  <template v-if="items.length === 0">
   <div>You currently have no items saved to this collection.</div>
 </template>
    <template v-else-if="selectedCollection === 'pas'">
      <PASCard v-for="item in items" :key="item.recordID" :item="item" />
    </template>
    <template v-else>
      <EURCard v-for="item in items" :key="item.recordID" :item="item" />
    </template>
  </div>
  </div>
 
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useItemsStore } from '@/stores/items'
import { useUserStore } from '@/stores/users'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const store = useItemsStore()

onBeforeMount(() => {
  store.pasSearchContext = { query: '', tags: [], page: 1, items: [], totalPages: 1 }
  store.eurSearchContext = { query: '', tags: [], page: 1, items: [], totalPages: 1 }
})

const selectedCollection = ref(route.query.collection === 'eur' ? 'eur' : 'pas')

watch(selectedCollection, (newVal) => {
  router.replace({ query: { ...route.query, collection: newVal } })
})

const items = computed(() => {
    return selectedCollection.value === 'pas' ? 
    userStore.user.savedItemsPAS
    : userStore.user.savedItemsEUR
})


</script>

<style lang="scss" scoped>

</style>