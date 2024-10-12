import axios from 'axios'

export default {
  state: {
    items: [],
    tags: []
  },
  mutations: {
    setBacklogItems(state, items) {
      state.items = items
    },
    addBacklogItem(state, item) {
      state.items.push(item)
    },
    updateBacklogItem(state, updatedItem) {
      const index = state.items.findIndex(i => i.id === updatedItem.id)
      if (index !== -1) {
        state.items.splice(index, 1, updatedItem)
      }
    },
    setTags(state, tags) {
      state.tags = tags
    }
  },
  actions: {
    async fetchBacklogItems({ commit }) {
      try {
        // Mock API call
        const mockItems = [
          { id: 1, title: 'Item 1', description: 'Description 1', priority: 'High', category: 'Feature', tags: ['tag1', 'tag2'] },
          { id: 2, title: 'Item 2', description: 'Description 2', priority: 'Medium', category: 'Bug', tags: ['tag2', 'tag3'] }
        ]
        commit('setBacklogItems', mockItems)
        return mockItems
      } catch (error) {
        console.error('Failed to fetch backlog items:', error)
        throw error
      }
    },
    async createBacklogItem({ commit }, itemData) {
      try {
        // Mock API call
        const newItem = { id: Date.now(), ...itemData }
        commit('addBacklogItem', newItem)
        return newItem
      } catch (error) {
        console.error('Failed to create backlog item:', error)
        throw error
      }
    },
    async updateBacklogItem({ commit }, { id, ...itemData }) {
      try {
        // Mock API call
        const updatedItem = { id, ...itemData }
        commit('updateBacklogItem', updatedItem)
        return updatedItem
      } catch (error) {
        console.error('Failed to update backlog item:', error)
        throw error
      }
    },
    async fetchTags({ commit }) {
      try {
        // Mock API call
        const mockTags = ['tag1', 'tag2', 'tag3', 'tag4']
        commit('setTags', mockTags)
        return mockTags
      } catch (error) {
        console.error('Failed to fetch tags:', error)
        throw error
      }
    },
    async importBacklogFromCSV({ dispatch }, file) {
      // Implementation for CSV import (mock for now)
      console.log('Importing from CSV:', file)
      await dispatch('fetchBacklogItems')
    },
    async importBacklogFromIntegration({ dispatch }, integrationId) {
      // Implementation for integration import (mock for now)
      console.log('Importing from integration:', integrationId)
      await dispatch('fetchBacklogItems')
    }
  },
  getters: {
    getBacklogItemById: (state) => (id) => {
      return state.items.find(item => item.id === id)
    }
  }
}