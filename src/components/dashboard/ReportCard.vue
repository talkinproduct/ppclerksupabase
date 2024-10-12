<template>
  <Card>
    <template #title>{{ title }}</template>
    <template #content>
      <h2 class="text-4xl font-bold text-center">{{ value }}</h2>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card'

export default {
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }
}
</script>