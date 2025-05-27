<template>
    <!-- Toast notification -->
<div
  v-if="showToast"
  class="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300"
>
  {{ toastMessage }}
</div>

    <button
    class="text-xl font-semibold hover:underline mb-1"
    @click="$router.back()"
  >
    ← Back 
  </button>

   <!-- Responsive Layout Container -->
  <div class="flex flex-col sm:flex-row gap-1 max-w-6xl mx-auto">

   <!-- LEFT COLUMN: Item Info + Add/Remove Buttons -->
  <div class="sm:w-1/2 sm:text-xl">
   <!-- Item Info -->
     <div class="my-2 p-4 bg-customYellow">
    <div v-if="item">
      <h1 class="text-2xl font-bold mb-4">{{ item.title[0][0].toUpperCase()+item.title[0].slice(1) || item.name }}</h1>
      <img v-if="item.edmPreview" :src="item.edmPreview" class="mb-4" />
      <h2><b>Description: </b>{{ item.dcDescriptionLangAware.en[0] }}</h2>
      <h2><b>Collection: </b>{{ item.dataProvider[0] }}</h2>
      <h2><b>Type: </b>{{ item.type[0] + item.type.slice(1).toLowerCase()  || 'Not specified' }} </h2>
      <h2><b>Year of archive: </b>{{ item.year?.[0] || 'n/a' }}</h2>
      <h2><b>Provided by: </b>{{ item.provider[0] || 'Not specified' }}  </h2>
    </div>
    <div v-else class="text-gray-500">No item found.</div>
  </div>

  <!-- Add/Remove Buttons -->
    <div v-if="item" class="py-1 flex flex-col gap-2 items-start">
      <button
  class="bg-customYellow font-semibold p-1 rounded-b w-fit disabled:opacity-50 disabled:cursor-not-allowed"
  :disabled="isSaved"
  @click="addToEUR"
>
  Add to your collection
</button>
<button
  class="bg-customYellow font-semibold p-1 rounded-b w-fit disabled:opacity-50 disabled:cursor-not-allowed"
  :disabled="!isSaved"
  @click="removeFromEUR"
>
  Remove from your collection
</button>
      </div>
  </div>
 
  <!-- RIGHT COLUMN: Tags + Currently Searching -->
<div class="sm:w-1/2 sm:pl-4 flex flex-col gap-2">
  
  <!-- QUERY SECTION -->
   <div v-if="store.eurSearchContext.query">
   <div>
  <h2>Your search query:</h2>
  <div class="flex gap-2 flex-wrap mt-1">
    <div
      class="px-2 py-1 text-xs text-white bg-black sm:text-base border border-black rounded"
    >
      {{ store.eurSearchContext.query }}
    </div>
  </div>
</div>

<!-- Tags Section -->
      <div>
        <h2>Your search tags:</h2>
        <div class="flex gap-2 flex-wrap mt-1">
          <div
            v-for="tag in store.eurSearchContext.tags"
            :key="tag"
            class="px-2 py-1 text-xs text-white bg-black sm:text-base border border-black rounded"
          >
            {{ tag }}
          </div>
        </div>
      </div>
      </div>

       <!-- Currently Searching Section -->
      <div>
        <h2 v-if="store.eurSearchContext.query">Currently Searching:</h2>
        <h2 v-else>Saved from:</h2>
        <div class="flex gap-2 flex-wrap mt-1 mb-4">
          <div class="px-2 py-1 text-xs sm:text-base border border-black rounded">
            Portable Antiquities Scheme
          </div>
          <div class="px-2 py-1 text-xs text-white bg-black sm:text-base border border-black rounded">
            Europeana
          </div>
        </div>
      </div>


</div>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useItemsStore } from '@/stores/items'
import { useUserStore } from '@/stores/users'
import { useRoute } from 'vue-router'

const toastMessage = ref('')
const showToast = ref(false)

//Stores
const store = useItemsStore()
const userStore = useUserStore()
const route = useRoute()

//Computed item
const item = computed(() => {
  if (store.selectedItem) return store.selectedItem
  const id = route.params.id
  return store.items.find(i => i.id == id || i._id == id || i.identifier == id)
})

const itemId = computed(() => item.value?.id)

const isSaved = computed(() => item.value ? userStore.isInEUR(item.value.id) : false)

function addToEUR() {
  if (item.value) userStore.addToEUR(item.value)
   showToastMessage('Item added to your collection')
}

function removeFromEUR() {
  if (item.value?.id) userStore.removeFromEUR(item.value.id)
  showToastMessage('Item removed from your collection')
}

function showToastMessage(message: string) {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000) // Hide after 3 seconds
}


</script>