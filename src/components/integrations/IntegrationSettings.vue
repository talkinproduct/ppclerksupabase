<template>
  <DataTable :value="integrations" responsiveLayout="scroll">
    <Column field="name" header="Name"></Column>
    <Column field="description" header="Description"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button 
          :label="slotProps.data.connected ? 'Disconnect' : 'Connect'"
          :class="slotProps.data.connected ? 'p-button-danger' : 'p-button-success'"
          @click="slotProps.data.connected ? $emit('disconnect', slotProps.data) : $emit('connect', slotProps.data)"
        />
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
    integrations: {
      type: Array,
      required:true
    }
  },
  emits: ['connect', 'disconnect']
}
</script>