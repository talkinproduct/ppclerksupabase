<template>
  <DataTable :value="sessions" responsiveLayout="scroll">
    <Column field="title" header="Title"></Column>
    <Column field="status" header="Status"></Column>
    <Column field="participantCount" header="Participants"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button label="Vote" @click="$emit('vote', slotProps.data)" :disabled="slotProps.data.status !== 'Active'" />
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
    sessions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['vote']
}
</script>