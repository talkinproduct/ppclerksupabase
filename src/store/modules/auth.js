import { useAuth } from '@clerk/clerk-vue'
import router from '@/router'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    }
  },
  actions: {
    async fetchUser({ commit }) {
      const { user } = useAuth()
      if (user.value) {
        commit('setUser', {
          id: user.value.id,
          email: user.value.primaryEmailAddress.emailAddress,
          firstName: user.value.firstName,
          lastName: user.value.lastName
        })
      }
    },
    async logout({ commit }) {
      const { signOut } = useAuth()
      await signOut()
      commit('clearUser')
      router.push('/login')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user
  }
}