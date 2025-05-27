import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: 'test-user',
      savedItemsPAS: [] as any[],
      savedItemsEUR: [] as any[],
    }
  }),

  actions: {
    addToPAS(item: any) {
      if (!this.user.savedItemsPAS.find((i: any) => i.id === item.id)) {
        this.user.savedItemsPAS.push(item)
      }
    },
    removeFromPAS(itemId: string | number) {
      this.user.savedItemsPAS = this.user.savedItemsPAS.filter((i: any) => i.id !== itemId)
    },
    isInPAS(itemId: string | number) {
      return this.user.savedItemsPAS.some((i: any) => i.id === itemId)
    },

    addToEUR(item: any) {
      if (!this.user.savedItemsEUR.find((i: any) => i.id === item.id)) {
        this.user.savedItemsEUR.push(item)
      }
    },
    removeFromEUR(itemId: string | number) {
      this.user.savedItemsEUR = this.user.savedItemsEUR.filter((i: any) => i.id !== itemId)
    },
    isInEUR(itemId: string | number) {
      return this.user.savedItemsEUR.some((i: any) => i.id === itemId)
    },
  },
  persist: {
    storage: localStorage,
  } 
})
