<template>
    <div>
<Header />
<CurrentlySearching
:selected-search="selectedSearch"
@update-selected-search="selectedSearch = $event"
/>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const selectedSearch = ref('pas')

</script>

<style lang="scss" scoped>

</style>