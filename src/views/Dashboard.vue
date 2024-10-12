<template>
  <div class="dashboard">
    <h1>Analytics Dashboard</h1>
    <div class="grid">
      <div class="col-12 md:col-6">
        <ReportCard title="Active Voting Sessions" :value="activeSessionsCount" />
      </div>
      <div class="col-12 md:col-6">
        <ReportCard title="Total Backlog Items" :value="totalBacklogItems" />
      </div>
    </div>
    <div class="mt-4">
      <ParticipationStats />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import ReportCard from '@/components/dashboard/ReportCard.vue'
import ParticipationStats from '@/components/dashboard/ParticipationStats.vue'

export default {
  components: {
    ReportCard,
    ParticipationStats
  },
  setup() {
    const store = useStore()
    const activeSessionsCount = ref(0)
    const totalBacklogItems = ref(0)

    onMounted(async () => {
      try {
        const analytics = await store.dispatch('fetchAnalytics')
        activeSessionsCount.value = analytics?.activeSessionsCount || 0
        totalBacklogItems.value = analytics?.totalBacklogItems || 0
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        store.dispatch('showNotification', {
          message: 'Failed to fetch analytics data',
          severity: 'error'
        })
      }
    })

    return {
      activeSessionsCount,
      totalBacklogItems
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 1rem;
}
</style>