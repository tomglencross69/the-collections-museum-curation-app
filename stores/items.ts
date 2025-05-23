import {defineStore} from 'pinia'

export const useItemsStore = defineStore('items', {
  state: () => ({
    pasItems: [] as any[],
    eurItems: [] as any[],
  }),
  actions: {
    setItems(source: 'pas' | 'eur', newItems: any[]) {
      if (source === 'pas') this.pasItems = newItems
      else this.eurItems = newItems
    },
    getItemById(source: 'pas' | 'eur', id: string | number) {
      const items = source === 'pas' ? this.pasItems : this.eurItems
      return items.find(item => item.id === id)
    }
  }
})