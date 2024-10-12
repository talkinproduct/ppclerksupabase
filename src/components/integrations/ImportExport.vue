<template>
  <Card class="mt-4">
    <template #title>Import/Export</template>
    <template #content>
      <div class="p-d-flex p-jc-between">
        <FileUpload mode="basic" accept=".json" :maxFileSize="1000000" label="Import Data" @upload="importData" />
        <Button label="Export Data" icon="pi pi-download" @click="exportData" />
      </div>
    </template>
  </Card>
</template>

<script>
import { useStore } from 'vuex'
import Card from 'primevue/card'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'

export default {
  components: {
    Card,
    FileUpload,
    Button
  },
  setup() {
    const store = useStore()

    const importData = async (event) => {
      try {
        const file = event.files[0]
        await store.dispatch('importData', file)
        console.log('Data imported successfully')
      } catch (error) {
        console.error('Failed to import data:', error)
      }
    }

    const exportData = async () => {
      try {
        const data = await store.dispatch('exportData')
        downloadFile(data, 'productpoker_export.json', 'application/json')
      } catch (error) {
        console.error('Failed to export data:', error)
      }
    }

    const downloadFile = (content, fileName, contentType) => {
      const a = document.createElement('a')
      const file = new Blob([content], { type: contentType })
      a.href = URL.createObjectURL(file)
      a.download = fileName
      a.click()
    }

    return {
      importData,
      exportData
    }
  }
}
</script>