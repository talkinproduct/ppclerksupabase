<template>
  <Toast />
</template>

<script>
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

export default {
  name: 'Notification',
  components: {
    Toast
  },
  setup() {
    const store = useStore()
    const toast = useToast()

    store.watch(
      (state) => state.notification,
      (newNotification) => {
        if (newNotification.show) {
          toast.add({
            severity: newNotification.severity,
            summary: newNotification.summary,
            detail: newNotification.message,
            life: newNotification.timeout
          })
          store.commit('clearNotification')
        }
      }
    )

    return {}
  }
}
</script>