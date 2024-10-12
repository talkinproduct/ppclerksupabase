<template>
  <div class="register-container">
    <Card class="register-card">
      <template #title>
        <h2>Register</h2>
      </template>
      <template #content>
        <div v-if="!isLoaded">Loading...</div>
        <div v-else>
          <SignUp />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { useAuth } from '@clerk/clerk-vue'
import { SignUp } from '@clerk/clerk-vue'
import Card from 'primevue/card'

export default {
  components: {
    Card,
    SignUp
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 100%;
  max-width: 400px;
}
</style>