<template>
  <form @submit.prevent="updateRole" class="p-fluid">
    <div class="field">
      <label for="role">Role</label>
      <Dropdown id="role" v-model="selectedRole" :options="roles" placeholder="Select Role" />
    </div>
    <Button type="submit" label="Update Role" />
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

export default {
  components: {
    Dropdown,
    Button
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'updated'],
  setup(props, { emit }) {
    const store = useStore()
    const selectedRole = ref(props.user.role)
    const roles = ['Admin', 'Product Manager', 'Stakeholder']

    const updateRole = async () => {
      try {
        await store.dispatch('updateUserRole', {
          userId: props.user.id,
          role: selectedRole.value
        })
        emit('updated')
        emit('close')
      } catch (error) {
        console.error('Failed to update user role:', error)
      }
    }

    return {
      selectedRole,
      roles,
      updateRole
    }
  }
}
</script>