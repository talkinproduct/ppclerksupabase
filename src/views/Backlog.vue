<template>
  <div class="backlog">
    <h1>Backlog Management</h1>
    <div class="mb-3">
      <Button label="Add New Item" icon="pi pi-plus" @click="openCreateItemDialog" class="mr-2" />
      <Button label="Import Items" icon="pi pi-upload" @click="openImportDialog" />
    </div>
    
    <BacklogList v-if="backlogItems.length > 0" :items="backlogItems" @edit="openEditItemDialog" />
    <Message v-else severity="info" text="No backlog items available." />
    
    <Dialog v-model:visible="createItemDialog" header="Add New Item" :style="{width: '50vw'}" :modal="true">
      <BacklogItem @close="createItemDialog = false" @created="fetchBacklogItems" />
    </Dialog>
    
    <Dialog v-model:visible="editItemDialog" header="Edit Item" :style="{width: '50vw'}" :modal="true">
      <BacklogItem 
        v-if="selectedItem"
        :item="selectedItem" 
        @close="editItemDialog = false" 
        @updated="handleItemUpdated" 
      />
    </Dialog>
    
    <Dialog v-model:visible="importDialog" header="Import Items" :style="{width: '50vw'}" :modal="true">
      <ImportBacklog @close="importDialog = false" @imported="fetchBacklogItems" />
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import BacklogList from '@/components/backlog/BacklogList.vue'
import BacklogItem from '@/components/backlog/BacklogItem.vue'
import ImportBacklog from '@/components/backlog/ImportBacklog.vue'

export default {
  components: {
    Button,
    Dialog,
    Message,
    BacklogList,
    BacklogItem,
    ImportBacklog
  },
  setup() {
    const store = useStore()
    const backlogItems = ref([])
    const createItemDialog = ref(false)
    const editItemDialog = ref(false)
    const importDialog = ref(false)
    const selectedItem = ref(null)

    const fetchBacklogItems = async () => {
      try {
        const items = await store.dispatch('fetchBacklogItems')
        backlogItems.value = Array.isArray(items) ? items : []
      } catch (error) {
        console.error('Failed to fetch backlog items:', error)
        store.dispatch('showNotification', {
          message: 'Failed to fetch backlog items',
          severity: 'error'
        })
        backlogItems.value = []
      }
    }

    const openCreateItemDialog = () => {
      createItemDialog.value = true
    }

    const openEditItemDialog = (item) => {
      selectedItem.value = item
      editItemDialog.value = true
    }

    const openImportDialog = () => {
      importDialog.value = true
    }

    const handleItemUpdated = async () => {
      editItemDialog.value = false
      await fetchBacklogItems()
    }

    onMounted(fetchBacklogItems)

    return {
      backlogItems,
      createItemDialog,
      editItemDialog,
      importDialog,
      selectedItem,
      openCreateItemDialog,
      openEditItemDialog,
      openImportDialog,
      handleItemUpdated,
      fetchBacklogItems
    }
  }
}
</script>

<style scoped>
.backlog {
  padding: 1rem;
}
</style>