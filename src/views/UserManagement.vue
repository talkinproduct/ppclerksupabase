<template>
  <div class="user-management">
    <h1>User Management</h1>
    <UserList :users="users" @edit-role="openEditRoleDialog" />
    
    <Dialog v-model:visible="editRoleDialog" header="Edit User Role" :style="{width: '30vw'}" :modal="true">
      <UserRole 
        v-if="selectedUser"
        :user="selectedUser" 
        @close="editRoleDialog = false" 
        @updated="handleRoleUpdated" 
      />
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Dialog from 'primevue/dialog'
import UserList from '@/components/user/UserList.vue'
import UserRole from '@/components/user/UserRole.vue'

export default {
  components: {
    Dialog,
    UserList,
    UserRole
  },
  setup() {
    const store = useStore()
    const users = ref([])
    const editRoleDialog = ref(false)
    const selectedUser = ref(null)

    const fetchUsers = async () => {
      try {
        users.value = await store.dispatch('fetchUsers')
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    const openEditRoleDialog = (user) => {
      selectedUser.value = user
      editRoleDialog.value = true
    }

    const handleRoleUpdated = async () => {
      editRoleDialog.value = false
      await fetchUsers()
    }

    onMounted(fetchUsers)

    return {
      users,
      editRoleDialog,
      selectedUser,
      openEditRoleDialog,
      handleRoleUpdated
    }
  }
}
</script>

<style scoped>
.user-management {
  padding: 1rem;
}
</style>