import axios from 'axios'

export default {
  state: {
    sessions: []
  },
  mutations: {
    setSessions(state, sessions) {
      state.sessions = sessions
    },
    addSession(state, session) {
      state.sessions.push(session)
    },
    updateSession(state, updatedSession) {
      const index = state.sessions.findIndex(s => s.id === updatedSession.id)
      if (index !== -1) {
        state.sessions.splice(index, 1, updatedSession)
      }
    }
  },
  actions: {
    async fetchVotingSessions({ commit }) {
      try {
        // Mock API call
        const mockSessions = [
          { id: 1, title: 'Session 1', status: 'Active', participantCount: 5 },
          { id: 2, title: 'Session 2', status: 'Completed', participantCount: 8 }
        ]
        commit('setSessions', mockSessions)
        return mockSessions
      } catch (error) {
        console.error('Failed to fetch voting sessions:', error)
        throw error
      }
    },
    async createVotingSession({ commit }, sessionData) {
      try {
        // Mock API call
        const newSession = {
          id: Date.now(),
          ...sessionData,
          status: 'Active',
          participantCount: 0
        }
        commit('addSession', newSession)
        return newSession
      } catch (error) {
        console.error('Failed to create voting session:', error)
        throw error
      }
    },
    async submitVote({ commit }, { sessionId, votes }) {
      try {
        // Mock API call
        const updatedSession = {
          id: sessionId,
          // Add other session properties here
          votes: votes
        }
        commit('updateSession', updatedSession)
        return updatedSession
      } catch (error) {
        console.error('Failed to submit vote:', error)
        throw error
      }
    }
  },
  getters: {
    getSessionById: (state) => (id) => {
      return state.sessions.find(session => session.id === id)
    }
  }
}