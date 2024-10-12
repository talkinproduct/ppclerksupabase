<template>
  <DataTable :value="items" responsiveLayout="scroll">
    <Column field="title" header="Title"></Column>
    <Column field="description" header="Description"></Column>
    <Column field="priority" header="Priority"></Column>
    <Column field="category" header="Category"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" @click="$emit('edit', slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

export default {
  components: {
    DataTable,
    Column,
    Button
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['edit']
}
</script>