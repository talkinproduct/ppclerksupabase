import axios from 'axios'

export default {
  state: {
    analyticsData: null
  },
  mutations: {
    setAnalyticsData(state, data) {
      state.analyticsData = data
    }
  },
  actions: {
    async fetchAnalytics({ commit }) {
      try {
        const response = await axios.get('/api/analytics')
        commit('setAnalyticsData', response.data)
        return response.data
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        throw error
      }
    }
  },
  getters: {
    getAnalyticsData: (state) => state.analyticsData
  }
}