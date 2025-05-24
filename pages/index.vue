<template>
  <div>
    <NavBar />

    <CurrentlySearching
      :selected-search="selectedSearch"
      @update-selected-search="selectedSearch = $event"
    />

    <SearchBar
      v-model="searchText"
      @search="handleSearch"
      :placeholder="placeholderText"
    />

    <TagsBar
      :selected-search="selectedSearch"
      :tags="availableTags"
      :selected-tags="selectedTags"
      @update:selected-tags="selectedTags = $event"
    />

    <!-- LOADING AND ERROR STATE -->
    <div v-if="itemsStore.loading" class="text-blue-600 font-semibold my-2">
      Loading results...
    </div>
    <div v-if="itemsStore.error" class="text-red-600 font-semibold my-2">
      {{ itemsStore.error }}
    </div>
    <div
      v-if="hasSearched && !itemsStore.loading && !itemsStore.error && itemsStore.items.length === 0"
      class="text-gray-600 my-2 mx-1"
    >
      No results found.
    </div>

    <SearchResultsList
      :items="itemsStore.items"
      :selected-search="selectedSearch"
    />

    <Pagination
      v-if="itemsStore.totalPages > 1"
      :current-page="itemsStore.currentPage"
      :total-pages="itemsStore.totalPages"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import { useItemsStore } from '@/stores/items'
import {onMounted} from 'vue'

const itemsStore = useItemsStore()

const selectedSearch = ref('pas')
const searchText = ref('')
const selectedTags = ref<string[]>([])
const hasSearched = ref(false)

const placeholderText = computed(() =>
  selectedSearch.value === 'eur'
    ? 'Search archaeological sites...'
    : 'Search finds...'
)

const availableTags = computed(() =>
  selectedSearch.value === 'eur'
    ? ['All', 'Archaeology', 'Art', 'Industrial Heritage', 'Manuscripts', 'Migration', 'Photography']
    : ['All', 'Coin', 'Hoard', 'Vessel', 'Finger Ring', 'Brooch', 'Weight']
)

watch(selectedSearch, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // Save current state before switching
    if (oldVal && hasSearched.value) {
      itemsStore.setSearchContext({
        query: searchText.value.trim(),
        tags: selectedTags.value,
        page: itemsStore.currentPage,
        source: oldVal as 'pas' | 'eur',
      })
    }
    
    // Try to restore the new search context
    const ctx = itemsStore.restoreSearchContext(newVal as 'pas' | 'eur')
    if (ctx && ctx.query) {
      searchText.value = ctx.query
      selectedTags.value = ctx.tags
      hasSearched.value = true
    } else {
      resetPage()
    }
  }
})

watchEffect(() => {
  if (!selectedTags.value.length) {
    selectedTags.value = [availableTags.value[0]]
  }
})

function resetPage() {
  searchText.value = ''
  selectedTags.value = [availableTags.value[0]]
  hasSearched.value = false
  itemsStore.reset()
}

async function handleSearch() {
  hasSearched.value = true
  itemsStore.setCurrentPage(1)
  itemsStore.setCurrentSearchSource(selectedSearch.value as 'pas' | 'eur')

  const payload = {
    query: searchText.value.trim(),
    tags: selectedTags.value,
    page: 1, // Always start from page 1 on new search
  }

  if (!payload.query) {
    itemsStore.setItems([])
    return
  }

  if (selectedSearch.value === 'pas') {
    await fetchPAS(payload)
  } else {
    await fetchEUR(payload)
  }

  // Set search context AFTER successful fetch
  itemsStore.setSearchContext({
    query: searchText.value.trim(),
    tags: selectedTags.value,
    page: 1,
    source: selectedSearch.value as 'pas' | 'eur',
  })
}

async function fetchPAS(payload: { query: string; tags: string[]; page?: number }) {
  itemsStore.setLoading(true)
  itemsStore.setError(null)
  itemsStore.setItems([])

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

    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`PAS API error: ${res.statusText} - ${text}`)
    }

    const data = await res.json()
    itemsStore.setItems(data.results || [])
    itemsStore.setCurrentPage(data.meta.currentPage || 1)
    itemsStore.setTotalPages(Math.ceil(data.meta.totalResults / data.meta.resultsPerPage))
  } catch (e: any) {
    itemsStore.setError(e.message || 'Unknown error')
  } finally {
    itemsStore.setLoading(false)
  }
}

async function fetchEUR(payload: { query: string; tags: string[]; page?: number }) {
  itemsStore.setLoading(true)
  itemsStore.setError(null)
  itemsStore.setItems([])

  const config = useRuntimeConfig()
  const apiKey = config.public.europeanaApi

  try {
    const page = payload.page || 1
    const rows = 12
    const start = (page - 1) * rows + 1

    const tagToCollection: Record<string, string> = {
      Archaeology: 'archaeology',
      Art: 'art',
      'Industrial Heritage': 'industrial',
      Manuscripts: 'manuscript',
      Migration: 'migration',
      Photography: 'photography',
    }

    let qf = ''
    const selectedTag = payload.tags.length ? payload.tags[0] : 'All'
    if (selectedTag !== 'All' && tagToCollection[selectedTag]) {
      qf = `collection:${tagToCollection[selectedTag]}`
    }

    const url = new URL('https://api.europeana.eu/record/v2/search.json')
    const params = {
      wskey: apiKey,
      query: payload.query || '*',
      rows: rows.toString(),
      start: start.toString(),
      profile: 'standard',
    }
    if (qf) params['qf'] = qf
    url.search = new URLSearchParams(params).toString()

    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Europeana API error: ${res.statusText} - ${text}`)
    }

    const data = await res.json()
    itemsStore.setItems(data.items || [])
    itemsStore.setCurrentPage(page)
    itemsStore.setTotalPages(Math.ceil((data.totalResults || 0) / rows))
  } catch (e: any) {
    itemsStore.setError(e.message || 'Unknown error')
  } finally {
    itemsStore.setLoading(false)
  }
}

function handlePageChange(newPage: number) {
  itemsStore.setCurrentPage(newPage)
  
  // Update search context with new page
  itemsStore.setSearchContext({
    query: searchText.value.trim(),
    tags: selectedTags.value,
    page: newPage,
    source: selectedSearch.value,
  })

  const payload = {
    query: searchText.value.trim(),
    tags: selectedTags.value,
    page: newPage,
  }

  if (selectedSearch.value === 'pas') {
    fetchPAS(payload)
  } else {
    fetchEUR(payload)
  }
}

onMounted(() => {
  // Try to restore the last active search context
  const lastSource = itemsStore.currentSearchSource
  const ctx = itemsStore.restoreSearchContext(lastSource)
  
  if (ctx && ctx.query) {
    searchText.value = ctx.query
    selectedTags.value = ctx.tags.length ? ctx.tags : [availableTags.value[0]]
    selectedSearch.value = ctx.source
    hasSearched.value = true
    
    // The items and pagination are already restored by restoreSearchContext
    // No need to fetch again since we have the cached results
  }
})
</script>

<style scoped lang="scss">
</style>