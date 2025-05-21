<template>
    <div>
<Header />

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

const items = computed(() =>
  selectedSearch.value === 'pas' ? testDataPAS : testDataMP
)

const handleSearch = () => {
    const payload = {
        query: searchText.value,
        tags: selectedTags.value
    }

    if (selectedSearch.value === 'pas') {
        fetchPAS(payload) 
    } else {
        fetchMP(payload)
    }
}

const fetchPAS = (payload: {query: string, tags: string[]}) => {
    console.log('Calling Portable Antiquities Scheme API with:', payload)
}

const fetchMP = (payload: {query: string, tags: string[]}) => {
    console.log('Calling Megalithic Portal API with:', payload)
}

const placeholderText = computed(() =>
  selectedSearch.value === 'mp'
    ? 'Search archaeological sites...'
    : 'Search finds...'
)

const availableTags = computed(() => {
  return selectedSearch.value === 'mp'
    ? ['Stone circles', 'Burial chambers', 'Rock art']
    : ['Blade', 'Tool', 'Flint', 'Neolithic', 'Coin']
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