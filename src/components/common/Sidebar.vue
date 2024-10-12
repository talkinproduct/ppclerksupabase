<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
        <span class="font-semibold text-2xl text-primary">ProductPoker</span>
      </div>
      <Menu :model="menuItems" class="mt-4" />
      <div class="mt-auto p-4">
        <Button label="Sign Out" icon="pi pi-sign-out" @click="handleSignOut" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@clerk/clerk-vue'
import Menu from 'primevue/menu'
import Button from 'primevue/button'

export default {
  components: {
    Menu,
    Button
  },
  setup() {
    const router = useRouter()
    const { signOut } = useAuth()

    const menuItems = ref([
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/dashboard'
      },
      {
        label: 'Voting Sessions',
        icon: 'pi pi-fw pi-check-square',
        to: '/voting-sessions'
      },
      {
        label: 'Backlog',
        icon: 'pi pi-fw pi-list',
        to: '/backlog'
      },
      {
        label: 'User Management',
        icon: 'pi pi-fw pi-users',
        to: '/user-management'
      },
      {
        label: 'Integrations',
        icon: 'pi pi-fw pi-link',
        to: '/integrations'
      }
    ])

    const handleSignOut = async () => {
      await signOut()
      router.push('/login')
    }

    return {
      menuItems,
      handleSignOut
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>