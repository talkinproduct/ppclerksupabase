<template>
  <Card>
    <template #title>Participation Statistics</template>
    <template #content>
      <Chart type="bar" :data="chartData" :options="chartOptions" />
    </template>
  </Card>
</template>

<script>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Chart from 'primevue/chart'

export default {
  components: { Card, Chart },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [{
        label: 'Participation Rate',
        data: [],
        backgroundColor: '#4CAF50'
      }]
    })

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }

    onMounted(() => {
      // Mock data
      const mockData = [
        { sessionName: 'Session 1', participationRate: 75 },
        { sessionName: 'Session 2', participationRate: 85 },
        { sessionName: 'Session 3', participationRate: 60 },
        { sessionName: 'Session 4', participationRate: 90 }
      ]
      
      chartData.value.labels = mockData.map(item => item.sessionName)
      chartData.value.datasets[0].data = mockData.map(item => item.participationRate)
    })

    return { chartData, chartOptions }
  }
}
</script>