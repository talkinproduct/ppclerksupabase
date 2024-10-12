<template>
  <div class="login-container">
    <Card class="login-card">
      <template #title>
        <h2>Login</h2>
      </template>
      <template #content>
        <div v-if="!isLoaded">Loading...</div>
        <div v-else>
          <SignIn />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { useAuth } from '@clerk/clerk-vue'
import { SignIn } from '@clerk/clerk-vue'
import Card from 'primevue/card'

export default {
  components: {
    Card,
    SignIn
  },
  setup() {
    const { isLoaded } = useAuth()

    return {
      isLoaded
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 100%;
  max-width: 400px;
}
</style>