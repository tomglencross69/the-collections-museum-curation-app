<template>
    <div>
<NavBar/>
<CurrentlySearching
:selected-search="selectedSearch"
@update-selected-search="selectedSearch = $event"
/>

<SearchBar
v-model="searchText"
@search="handleSearch"
:placeholder="placeholderText"/>

<TagsBar
:selected-search="selectedSearch"
:tags="availableTags"
:selected-tags="selectedTags"
@update:selected-tags="selectedTags = $event"/>

<!-- LOADING AND ERROR STATE -->
<div v-if="loading" class="text-blue-600 font-semibold my-2">Loading results...</div>
<div v-if="error" class="text-red-600 font-semibold my-2">{{ error }}</div>


<SearchResultsList
  :items="items"
  :selected-search="selectedSearch"
/>

    </div>
</template>

<script setup lang="ts">

import {ref, computed, watch} from 'vue'
import { testDataPAS, testDataMP } from '@/test-data/testData'

const selectedSearch = ref('pas')
const searchText = ref("")
const selectedTags = ref<string[]>([])

// TEST DATA LOGIC
// const items = computed(() =>
//   selectedSearch.value === 'pas' ? testDataPAS : testDataMP
// )

const items = ref<any[]>([])

const loading = ref(false)
const error = ref<string | null>(null)

const handleSearch = async () => {
    const payload = {
        query: searchText.value.trim(),
        tags: selectedTags.value
    }

    if (!payload.query) {
      items.value = []
      return
    }

    if (selectedSearch.value === 'pas') {
        fetchPAS(payload) 
    } else {
        fetchMP(payload)
    }
}

async function fetchPAS(payload: {query: string; tags: string[]}) {
  loading.value = true
  error.value = null
  items.value = []

  try {
const url = `https://finds.org.uk/database/search/results/q/${encodeURIComponent(payload.query)}/format/json`

const res = await fetch(url)

if (!res.ok) throw new Error(`PAS API error: ${res.statusText}`)

const data = await res.json()

items.value = data.results || []
  } catch (e:any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}

function fetchMP(payload: {query: string; tags: string[]}) {
  items.value = testDataMP
  console.log('MP fetch not implemented yet:', payload)
}
// TEST DATA LOGIC
// const fetchPAS = (payload: {query: string, tags: string[]}) => {
//     console.log('Calling Portable Antiquities Scheme API with:', payload)
// }

// const fetchMP = (payload: {query: string, tags: string[]}) => {
//     console.log('Calling Megalithic Portal API with:', payload)
// }

const placeholderText = computed(() =>
  selectedSearch.value === 'mp'
    ? 'Search archaeological sites...'
    : 'Search finds...'
)

const availableTags = computed(() => {
  return selectedSearch.value === 'mp'
    ? ['All', 'Stone circles', 'Burial chambers', 'Rock art']
    : ['All', 'Blade', 'Tool', 'Flint', 'Neolithic', 'Coin']
})

watch(selectedSearch, () => {
  selectedTags.value = [availableTags.value[0]]
})
watchEffect(() => {
  selectedTags.value = [availableTags.value[0]]
})
</script>

<style lang="scss" scoped>

</style>