<template>
  <div class="home">
    <h1>Welcome to ProductPoker</h1>
    <p>Streamline your product backlog prioritization with collaborative voting sessions.</p>
    <div class="grid">
      <div class="col-12 md:col-4">
        <Card>
          <template #title>Voting Sessions</template>
          <template #content>
            Create and manage voting sessions to prioritize your backlog items.
          </template>
          <template #footer>
            <Button label="Go to Voting Sessions" icon="pi pi-check-square" @click="navigateTo('/voting-sessions')" />
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-4">
        <Card>
          <template #title>Backlog Management</template>
          <template #content>
            Organize and manage your product backlog items efficiently.
          </template>
          <template #footer>
            <Button label="Manage Backlog" icon="pi pi-list" @click="navigateTo('/backlog')" />
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-4">
        <Card>
          <template #title>Analytics Dashboard</template>
          <template #content>
            View insights and trends from your voting sessions and backlog.
          </template>
          <template #footer>
            <Button label="View Analytics" icon="pi pi-chart-bar" @click="navigateTo('/dashboard')" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default {
  name: 'Home',
  components: {
    Card,
    Button
  },
  setup() {
    const router = useRouter()

    const navigateTo = (path) => {
      router.push(path)
    }

    return {
      navigateTo
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
</style>