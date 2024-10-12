import axios from 'axios'

export default {
  state: {
    integrations: []
  },
  mutations: {
    setIntegrations(state, integrations) {
      state.integrations = integrations
    },
    updateIntegration(state, updatedIntegration) {
      const index = state.integrations.findIndex(i => i.id === updatedIntegration.id)
      if (index !== -1) {
        state.integrations.splice(index, 1, updatedIntegration)
      }
    }
  },
  actions: {
    async fetchIntegrations({ commit }) {
      try {
        const response = await axios.get('/api/integrations')
        commit('setIntegrations', response.data)
        return response.data
      } catch (error) {
        console.error('Failed to fetch integrations:', error)
        throw error
      }
    },
    async connectIntegration({ commit }, integration) {
      try {
        const response = await axios.post(`/api/integrations/${integration.id}/connect`)
        commit('updateIntegration', response.data)
        return response.data
      } catch (error) {
        console.error('Failed to connect integration:', error)
        throw error
      }
    },
    async disconnectIntegration({ commit }, integration) {
      try {
        const response = await axios.post(`/api/integrations/${integration.id}/disconnect`)
        commit('updateIntegration', response.data)
        return response.data
      } catch (error) {
        console.error('Failed to disconnect integration:', error)
        throw error
      }
    },
    async importData({ dispatch }, file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        await axios.post('/api/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        // Refresh relevant data after import
        await dispatch('fetchBacklogItems')
        await dispatch('fetchVotingSessions')
        await dispatch('fetchAnalytics')
      } catch (error) {
        console.error('Failed to import data:', error)
        throw error
      }
    },
    async exportData() {
      try {
        const response = await axios.get('/api/export', {
          responseType: 'blob'
        })
        return response.data
      } catch (error) {
        console.error('Failed to export data:', error)
        throw error
      }
    }
  },
  getters: {
    getIntegrationById: (state) => (id) => {
      return state.integrations.find(integration => integration.id === id)
    }
  }
}