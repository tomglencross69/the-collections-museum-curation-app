<template>
    <div class="flex justify-end gap-2 flex-wrap"> 
        <button
        v-for="tag in tags"
        :key="tag"
        @click="selectTag(tag)"
        :class="[
            'px-1 py-1 text-xs sm:text-base border border-black rounded',
            selectedTags.includes(tag) ? 'bg-black text-white':
            'bg-white text-black'
        ]"
        >
        {{ tag }}
        </button>

        
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
const props = defineProps<{
    selectedSearch: string
    selectedTags: string[]
    tags: string[]
}>()

const emit = defineEmits(['update:selectedTags'])

const selectTag = (tag:string) => {
    emit('update:selectedTags', [tag])
}

</script>

<style lang="css" scoped>


</style>