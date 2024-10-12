import { createStore } from 'vuex'
import auth from './modules/auth'
import votingSessions from './modules/votingSessions'
import backlog from './modules/backlog'
import analytics from './modules/analytics'
import integrations from './modules/integrations'

export default createStore({
  modules: {
    auth,
    votingSessions,
    backlog,
    analytics,
    integrations
  },
  state: {
    notification: {
      show: false,
      message: '',
      severity: 'info',
      summary: '',
      timeout: 3000
    }
  },
  mutations: {
    setNotification(state, { message, severity = 'info', summary = '', timeout = 3000 }) {
      state.notification = {
        show: true,
        message,
        severity,
        summary,
        timeout
      }
    },
    clearNotification(state) {
      state.notification.show = false
    }
  },
  actions: {
    showNotification({ commit }, notification) {
      commit('setNotification', notification)
    }
  }
})