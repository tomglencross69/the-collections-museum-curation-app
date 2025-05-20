<template>
  <div class="wrapper flex flex-col sm:flex-row sm:items-center gap-y-1 text-base sm:text-lg sm:gap-x-2 leading-none">
    <span class="currently-searching ml-1">Currently searching:</span>


    <div class="inline-flex flex-col sm:flex-row w-max sm:gap-x-2">
   
      <button
      @click="setSearch('pas')" 
      :class="[
        'px-2 py-1 border text-left text-sm rounded whitespace-nowrap', 
        selectedSearch === 'pas' ? 'bg-black text-white' : 'bg-white text-black'
        ]">
        The Portable Antiquities Scheme
      </button>
      <button
      @click="setSearch('mp')" 
      :class="[
        'px-2 py-1 border text-left text-sm rounded whitespace-nowrap', 
        selectedSearch === 'mp' ? 'bg-black text-white' : 'bg-white text-black'
        ]">
        The Megalithic Portal
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
const props = defineProps({
    selectedSearch: String
})

const emit = defineEmits(['update-selected-search'])

const setSearch = (search) => {
    emit('update-selected-search', search)
}

</script>

<style lang="scss" scoped>

</style>