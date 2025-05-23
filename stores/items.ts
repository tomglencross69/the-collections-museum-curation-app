import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as any[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    selectedItem: null as any | null,
    searchContext: {
      query: '',
      tags: [] as string[],
      page: 1,
      source: 'pas' as 'pas' | 'eur',
    }
  }),
  actions: {
    setItems(items: any[]) {
      this.items = items
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setError(error: string | null) {
      this.error = error
    },
    setCurrentPage(page: number) {
      this.currentPage = page
    },
    setTotalPages(total: number) {
      this.totalPages = total
    },
    setSelectedItem(item: any) {
      this.selectedItem = item
    },
    setSearchContext(ctx: { query: string; tags: string[]; page: number; source: 'pas' | 'eur' }) {
      this.searchContext = ctx
    },
    reset() {
      this.items = []
      this.loading = false
      this.error = null
      this.currentPage = 1
      this.totalPages = 1
      this.selectedItem = null  
      this.searchContext = { query: '', tags: [], page: 1, source: 'pas' }
    },
  },
})
