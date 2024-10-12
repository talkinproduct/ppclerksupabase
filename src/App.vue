<template>
  <div class="app-container">
    <Sidebar v-if="isAuthenticated" />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
    <Toast />
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Sidebar from '@/components/common/Sidebar.vue'
import Footer from '@/components/common/Footer.vue'
import Toast from 'primevue/toast'

export default {
  name: 'App',
  components: {
    Sidebar,
    Footer,
    Toast
  },
  setup() {
    const store = useStore()

    const isAuthenticated = computed(() => store.getters.isAuthenticated)

    onMounted(() => {
      store.dispatch('fetchUser')
    })

    return {
      isAuthenticated
    }
  }
}
</script>

<style lang="scss">
.app-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>