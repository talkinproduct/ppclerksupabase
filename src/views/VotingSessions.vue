<template>
  <div class="voting-sessions">
    <h1>Voting Sessions</h1>
    <Button label="Create New Session" icon="pi pi-plus" @click="openCreateSessionDialog" class="mb-3" />
    <VotingSessionList v-if="sessions.length > 0" :sessions="sessions" @vote="openVoteDialog" />
    <Message v-else severity="info" text="No voting sessions available." />
    
    <Dialog v-model:visible="createSessionDialog" header="Create New Session" :style="{width: '50vw'}" :modal="true">
      <CreateVotingSession @close="createSessionDialog = false" @created="fetchSessions" />
    </Dialog>
    
    <Dialog v-model:visible="voteDialog" header="Vote" :style="{width: '50vw'}" :modal="true">
      <VoteCard v-if="selectedSession" :session="selectedSession" @vote-submitted="handleVoteSubmitted" />
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import VotingSessionList from '@/components/voting/VotingSessionList.vue'
import CreateVotingSession from '@/components/voting/CreateVotingSession.vue'
import VoteCard from '@/components/voting/VoteCard.vue'

export default {
  components: {
    Button,
    Dialog,
    Message,
    VotingSessionList,
    CreateVotingSession,
    VoteCard
  },
  setup() {
    const store = useStore()
    const sessions = ref([])
    const createSessionDialog = ref(false)
    const voteDialog = ref(false)
    const selectedSession = ref(null)

    const fetchSessions = async () => {
      try {
        const fetchedSessions = await store.dispatch('fetchVotingSessions')
        sessions.value = Array.isArray(fetchedSessions) ? fetchedSessions : []
      } catch (error) {
        console.error('Failed to fetch voting sessions:', error)
        store.dispatch('showNotification', {
          message: 'Failed to fetch voting sessions',
          severity: 'error'
        })
        sessions.value = []
      }
    }

    const openCreateSessionDialog = () => {
      createSessionDialog.value = true
    }

    const openVoteDialog = (session) => {
      selectedSession.value = session
      voteDialog.value = true
    }

    const handleVoteSubmitted = async () => {
      voteDialog.value = false
      await fetchSessions()
    }

    onMounted(fetchSessions)

    return {
      sessions,
      createSessionDialog,
      voteDialog,
      selectedSession,
      openCreateSessionDialog,
      openVoteDialog,
      handleVoteSubmitted,
      fetchSessions
    }
  }
}
</script>

<style scoped>
.voting-sessions {
  padding: 1rem;
}
</style>