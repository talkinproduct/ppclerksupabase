<template>
  <Menubar :model="items">
    <template #end>
      <Button label="Login" icon="pi pi-user" class="p-button-text" @click="navigateTo('/login')" />
      <Button label="Register" icon="pi pi-user-plus" class="p-button-text" @click="navigateTo('/register')" />
    </template>
  </Menubar>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

export default {
  components: {
    Menubar,
    Button
  },
  setup() {
    const router = useRouter()

    const items = ref([
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => router.push('/')
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-bar',
        command: () => router.push('/dashboard')
      },
      {
        label: 'Voting Sessions',
        icon: 'pi pi-fw pi-check-square',
        command: () => router.push('/voting-sessions')
      },
      {
        label: 'Backlog',
        icon: 'pi pi-fw pi-list',
        command: () => router.push('/backlog')
      },
      {
        label: 'User Management',
        icon: 'pi pi-fw pi-users',
        command: () => router.push('/user-management')
      },
      {
        label: 'Integrations',
        icon: 'pi pi-fw pi-link',
        command: () => router.push('/integrations')
      }
    ])

    const navigateTo = (path) => {
      router.push(path)
    }

    return {
      items,
      navigateTo
    }
  }
}
</script>