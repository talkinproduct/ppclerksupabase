<template>
  <div class="p-fluid">
    <div class="field">
      <label for="file">Select CSV file</label>
      <FileUpload id="file" mode="basic" :auto="true" accept=".csv" :maxFileSize="1000000" @upload="handleFileUpload" />
    </div>
    <div class="field">
      <label for="integration">Or select an integration</label>
      <Dropdown id="integration" v-model="selectedIntegration" :options="integrations" optionLabel="name" placeholder="Select Integration" />
    </div>
    <Button label="Import" @click="importItems" :disabled="!canImport" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import FileUpload from 'primevue/fileupload'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

export default {
  components: {
    FileUpload,
    Dropdown,
    Button
  },
  emits: ['close', 'imported'],
  setup(props, { emit }) {
    const store = useStore()
    const file = ref(null)
    const selectedIntegration = ref(null)
    const integrations = ref([])

    const canImport = computed(() => file.value || selectedIntegration.value)

    const handleFileUpload = (event) => {
      file.value = event.files[0]
    }

    const importItems = async () => {
      try {
        if (file.value) {
          await store.dispatch('importBacklogFromCSV', file.value)
        } else if (selectedIntegration.value) {
          await store.dispatch('importBacklogFromIntegration', selectedIntegration.value.id)
        }
        emit('imported')
        emit('close')
      } catch (error) {
        console.error('Failed to import backlog items:', error)
      }
    }

    // Fetch available integrations
    store.dispatch('fetchIntegrations').then(fetchedIntegrations => {
      integrations.value = fetchedIntegrations
    }).catch(error => {
      console.error('Failed to fetch integrations:', error)
    })

    return {
      file,
      selectedIntegration,
      integrations,
      canImport,
      handleFileUpload,
      importItems
    }
  }
}
</script>