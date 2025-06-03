<template>
  <div 
  @click="goToItem"
  class="exhibit-wrapper flex flex-col gap-2 transition transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer rounded-b-lg">
    <img
      :src="imageUrl || 'https://placehold.co/600x400'"
      class="exhibit-image w-full h-40 object-cover rounded px-2"
      alt="Artifact image"
      loading="lazy"
    />
    <div class="exhibit-card-text p-1 text-sm sm:text-base bg-customYellow rounded-b-lg h-full overflow-hidden">
      <h3 class="font-semibold">{{ item.objecttype }} ({{ item.broadperiod }})</h3>
      <p class="text-gray-600 italic">{{ item.county }}</p>
      <p class="mt-1">{{ truncatedDescription }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useItemsStore } from '@/stores/items'

const router = useRouter()
const store = useItemsStore()

const props = defineProps<{
  item: {
    id: number | string
    objecttype: string
    broadperiod: string
    county: string
    description: string
    imagedir?: string
    filename?: string
    source: string
  }
}>()


const imageUrl = computed(() =>
  props.item.imagedir && props.item.filename
    ? `https://finds.org.uk/${props.item.imagedir}${props.item.filename}`
    : ''
)

function goToItem() {
  store.setSelectedItem(props.item)
  const id = props.item.id 
  const source = props.item.source || 'pas' 
  router.push(`/searchresults/pas/${id}`)
}

// THUMBNAILS BLOCKED BY CORB
// const thumbImageUrl = computed(() => {
//   if (props.item.thumbnail) {
//     return `https://finds.org.uk/images/thumbnails/x${props.item.thumbnail}.jpg`
//   }

//   if (props.item.imagedir && props.item.filename) {
//     return `https://finds.org.uk/${props.item.imagedir}${props.item.filename}`
//   }

//   return 'https://placehold.co/600x400?text=No+Image'
// })

function decodeHTMLEntities(str: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

const decodedDescription = computed(() =>
  decodeHTMLEntities(props.item.description)
)


const truncatedDescription = computed(() => {
  if (!props.item.description) return ''

  const decoded = decodeHTMLEntities(props.item.description)

  const words = decoded.split(' ')
  
  return words.length > 10
    ? words.slice(0, 10).join(' ') + '...'
    : decoded
})
</script>
