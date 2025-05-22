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
<div v-if="!loading && !error && items.length === 0" class="text-gray-600 my-2 mx-1">
  No results found.
</div>


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
import { testDataPAS, testDataEUR } from '@/test-data/testData'

const selectedSearch = ref('pas')
const searchText = ref("")
const selectedTags = ref<string[]>([])
const items = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)


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
        fetchEUR(payload)
    }
}

// FETCHING FROM PAS
async function fetchPAS(payload: {query: string; tags: string[]; page?: number}) {
  loading.value = true
  error.value = null
  items.value = []

   const tagToFilter: Record<string, string> = {
    All: '',
    Coin: '/objectType/COIN',
    Hoard: '/objectType/HOARD',
    Vessel: '/objectType/VESSEL',
    'Finger Ring': '/objectType/FINGER+RING',
    Brooch: '/objectType/BROOCH',
    Weight: '/objectType/WEIGHT',
  }

  try {
const page = payload.page || 1

const selectedTag = payload.tags.length ? payload.tags[0] : 'All'

const tagValue = tagToFilter[selectedTag] || ''

const queryPart = encodeURIComponent(payload.query)

const tagFilter = tagValue ? `/sort/objectType${tagValue}` : ''

const url = `https://finds.org.uk/database/search/results/q/${queryPart}${tagFilter}/thumbnail/1/page/${page}/format/json`

console.log("fetching URL", url)

const res = await fetch(url)

if (!res.ok) {
  const text = await res.text()
  console.log('error response text',text)
throw new Error(`PAS API error: ${res.statusText}`)
}

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

//FETCHING FROM EUROPEANA
async function fetchEUR(payload: { query: string; tags: string[] }) {
  loading.value = true
  error.value = null
  items.value = []

  try {
    const url = new URL("https://api.europeana.eu/record/v2/search.json")
    url.search = new URLSearchParams({
      wskey: "nticulanth", // Replace with your actual key
      query: payload.query,
      thumbnail: "true",
      rows: "12",
      sort: "random",
      profile: "standard",
    }).toString()

    const res = await fetch(url)

    if (!res.ok) {
      const text = await res.text()
      console.log("Europeana API error:", text)
      throw new Error(`Europeana API error: ${res.statusText}`)
    }

    const data = await res.json()

    items.value = data.items || []
    totalPages.value = 1 
    currentPage.value = 1
  } catch (e: any) {
    error.value = e.message || "Unknown error"
  } finally {
    loading.value = false
  }
}


function handlePageChange(newPage: number) {
  currentPage.value = newPage
  
  if (selectedSearch.value === 'pas') {
    fetchPAS({
      query: searchText.value.trim(),
      tags: selectedTags.value,
      page: newPage
    })
  } else {
    fetchEUR({
      query: searchText.value.trim(),
      tags: selectedTags.value
      // Add page handling if/when EUR supports it
    })
  }
}

const placeholderText = computed(() =>
selectedSearch.value === 'eur'
? 'Search archaeological sites...'
: 'Search finds...'
)

const availableTags = computed(() => {
  return selectedSearch.value === 'eur'
  ? ['All', 'Stone circles', 'Burial chambers', 'Rock art']
  : ['All', 'Coin', 'Hoard', 'Vessel', 'Finger Ring', 'Brooch', 'Weight']
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



<!-- // TEST DATA LOGIC
// const fetchPAS = (payload: {query: string, tags: string[]}) => {
//     console.log('Calling Portable Antiquities Scheme API with:', payload)
// }

// const fetchEUR = (payload: {query: string, tags: string[]}) => {
//     console.log('Calling Megalithic Portal API with:', payload)
// } -->

<!-- // TEST DATA LOGIC
// const items = computed(() =>
//   selectedSearch.value === 'pas' ? testDataPAS : testDataEUR
// ) -->