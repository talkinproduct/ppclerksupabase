<template>
  <DataTable :value="users" responsiveLayout="scroll">
    <Column field="name" header="Name"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="role" header="Role"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button label="Edit Role" @click="$emit('edit-role', slotProps.data)" />
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
    users: {
      type: Array,
      required: true
    }
  },
  emits: ['edit-role']
}
</script>