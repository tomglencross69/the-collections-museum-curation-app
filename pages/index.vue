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

<Pagination
  v-if="totalPages > 1"
  :current-page="currentPage"
  :total-pages="totalPages"
  @update:page="handlePageChange"
/>

    </div>
</template>

<script setup lang="ts">

import {ref, computed, watch} from 'vue'
import { testDataPAS, testDataMP } from '@/test-data/testData'

const selectedSearch = ref('pas')
const searchText = ref("")
const selectedTags = ref<string[]>([])
const items = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)

// TEST DATA LOGIC
// const items = computed(() =>
//   selectedSearch.value === 'pas' ? testDataPAS : testDataMP
// )

const handleSearch = async () => {
  currentPage.value = 1
    const payload = {
        query: searchText.value.trim(),
        tags: selectedTags.value,
        page: currentPage.value
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

async function fetchPAS(payload: {query: string; tags: string[]; page?: number}) {
  loading.value = true
  error.value = null
  items.value = []

  try {
const page = payload.page || 1
const url = `https://finds.org.uk/database/search/results/q/${encodeURIComponent(payload.query)}/thumbnail/1/page/${page}/format/json`

const res = await fetch(url)

if (!res.ok) throw new Error(`PAS API error: ${res.statusText}`)

const data = await res.json()

items.value = data.results || []
currentPage.value = data.meta.currentPage || 1
totalPages.value = Math.ceil(data.meta.totalResults / data.meta.resultsPerPage)
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

function handlePageChange(newPage: number) {
  currentPage.value = newPage

  if (selectedSearch.value === 'pas') {
    fetchPAS({
      query: searchText.value.trim(),
      tags: selectedTags.value,
      page: newPage
    })
  } else {
    fetchMP({
      query: searchText.value.trim(),
      tags: selectedTags.value
      // Add page handling if/when MP supports it
    })
  }
}

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