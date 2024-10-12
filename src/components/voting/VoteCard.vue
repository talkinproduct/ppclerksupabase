<template>
  <div class="p-fluid">
    <h3>{{ session.title }}</h3>
    <p>{{ session.description }}</p>
    <form @submit.prevent="submitVote">
      <div v-if="session.backlogItems && session.backlogItems.length > 0">
        <div v-for="item in session.backlogItems" :key="item.id" class="field">
          <label :for="'item-' + item.id">{{ item.title }}</label>
          <Slider :id="'item-' + item.id" v-model="votes[item.id]" :min="1" :max="10" />
          <small>Value: {{ votes[item.id] }}</small>
        </div>
      </div>
      <div v-else>
        <p>No backlog items available for voting.</p>
      </div>
      <Button type="submit" label="Submit Vote" :disabled="!hasBacklogItems" />
    </form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Slider from 'primevue/slider'
import Button from 'primevue/button'

export default {
  components: {
    Slider,
    Button
  },
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  emits: ['vote-submitted'],
  setup(props, { emit }) {
    const store = useStore()
    const votes = ref({})

    const hasBacklogItems = computed(() => {
      return props.session.backlogItems && props.session.backlogItems.length > 0
    })

    onMounted(() => {
      if (hasBacklogItems.value) {
        props.session.backlogItems.forEach(item => {
          votes.value[item.id] = 5 // Default value
        })
      }
    })

    const submitVote = async () => {
      if (!hasBacklogItems.value) {
        console.warn('No backlog items to vote on')
        return
      }

      try {
        await store.dispatch('submitVote', {
          sessionId: props.session.id,
          votes: votes.value
        })
        emit('vote-submitted')
      } catch (error) {
        console.error('Failed to submit vote:', error)
      }
    }

    return { votes, submitVote, hasBacklogItems }
  }
}
</script>