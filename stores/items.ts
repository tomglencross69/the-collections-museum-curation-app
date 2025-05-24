import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as any[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    selectedItem: null as any | null,
    // Separate search contexts for each API to prevent cross-contamination
    pasSearchContext: {
      query: '',
      tags: [] as string[],
      page: 1,
      items: [] as any[],
      totalPages: 1,
    },
    eurSearchContext: {
      query: '',
      tags: [] as string[],
      page: 1,
      items: [] as any[],
      totalPages: 1,
    },
    currentSearchSource: 'pas' as 'pas' | 'eur',
  }),
  getters: {
    // Get the active search context based on current source
    activeSearchContext: (state) => {
      return state.currentSearchSource === 'pas' ? state.pasSearchContext : state.eurSearchContext
    }
  },
  actions: {
    setItems(items: any[]) {
      this.items = items
      // Also store in the appropriate context
      if (this.currentSearchSource === 'pas') {
        this.pasSearchContext.items = [...items]
      } else {
        this.eurSearchContext.items = [...items]
      }
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setError(error: string | null) {
      this.error = error
    },
    setCurrentPage(page: number) {
      this.currentPage = page
      // Update the appropriate context
      if (this.currentSearchSource === 'pas') {
        this.pasSearchContext.page = page
      } else {
        this.eurSearchContext.page = page
      }
    },
    setTotalPages(total: number) {
      this.totalPages = total
      // Update the appropriate context
      if (this.currentSearchSource === 'pas') {
        this.pasSearchContext.totalPages = total
      } else {
        this.eurSearchContext.totalPages = total
      }
    },
    setSelectedItem(item: any) {
      this.selectedItem = item
    },
    setCurrentSearchSource(source: 'pas' | 'eur') {
      this.currentSearchSource = source
    },
    setSearchContext(ctx: { query: string; tags: string[]; page: number; source: 'pas' | 'eur' }) {
      this.currentSearchSource = ctx.source
      
      if (ctx.source === 'pas') {
        this.pasSearchContext = {
          query: ctx.query,
          tags: [...ctx.tags],
          page: ctx.page,
          items: [...this.items],
          totalPages: this.totalPages,
        }
      } else {
        this.eurSearchContext = {
          query: ctx.query,
          tags: [...ctx.tags],
          page: ctx.page,
          items: [...this.items],
          totalPages: this.totalPages,
        }
      }
    },
    restoreSearchContext(source: 'pas' | 'eur') {
      this.currentSearchSource = source
      const context = source === 'pas' ? this.pasSearchContext : this.eurSearchContext
      
      if (context.query) {
        this.items = [...context.items]
        this.currentPage = context.page
        this.totalPages = context.totalPages
        return {
          query: context.query,
          tags: [...context.tags],
          page: context.page,
          source: source
        }
      }
      return null
    },
    reset() {
      this.items = []
      this.loading = false
      this.error = null
      this.currentPage = 1
      this.totalPages = 1
      this.selectedItem = null  
      // Don't reset search contexts - let them persist for navigation
    },
    fullReset() {
      this.items = []
      this.loading = false
      this.error = null
      this.currentPage = 1
      this.totalPages = 1
      this.selectedItem = null  
      this.pasSearchContext = { query: '', tags: [], page: 1, items: [], totalPages: 1 }
      this.eurSearchContext = { query: '', tags: [], page: 1, items: [], totalPages: 1 }
      this.currentSearchSource = 'pas'
    },
  },
})