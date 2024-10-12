<template>
  <div class="integrations">
    <h1>Integrations</h1>
    <IntegrationSettings :integrations="integrations" @connect="connectIntegration" @disconnect="disconnectIntegration" />
    <ImportExport />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import IntegrationSettings from '@/components/integrations/IntegrationSettings.vue'
import ImportExport from '@/components/integrations/ImportExport.vue'

export default {
  components: {
    IntegrationSettings,
    ImportExport
  },
  setup() {
    const store = useStore()
    const integrations = ref([])

    const fetchIntegrations = async () => {
      try {
        integrations.value = await store.dispatch('fetchIntegrations')
      } catch (error) {
        console.error('Failed to fetch integrations:', error)
      }
    }

    const connectIntegration = async (integration) => {
      try {
        await store.dispatch('connectIntegration', integration)
        await fetchIntegrations()
      } catch (error) {
        console.error('Failed to connect integration:', error)
      }
    }

    const disconnectIntegration = async (integration) => {
      try {
        await store.dispatch('disconnectIntegration', integration)
        await fetchIntegrations()
      } catch (error) {
        console.error('Failed to disconnect integration:', error)
      }
    }

    onMounted(fetchIntegrations)

    return {
      integrations,
      connectIntegration,
      disconnectIntegration
    }
  }
}
</script>

<style scoped>
.integrations {
  padding: 1rem;
}
</style>