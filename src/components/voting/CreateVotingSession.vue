<template>
  <form @submit.prevent="createSession">
    <div class="p-fluid">
      <div class="field">
        <label for="title">Session Title</label>
        <InputText id="title" v-model="title" required />
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="description" rows="3" />
      </div>
      <div class="field">
        <label for="backlogItems">Select Backlog Items</label>
        <MultiSelect id="backlogItems" v-model="selectedBacklogItems" :options="backlogItems" optionLabel="title" placeholder="Select Items" />
      </div>
      <Button type="submit" label="Create Session" />
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'

export default {
  components: {
    InputText,
    Textarea,
    MultiSelect,
    Button
  },
  emits: ['close', 'created'],
  setup(props, { emit }) {
    const store = useStore()
    const title = ref('')
    const description = ref('')
    const backlogItems = ref([])
    const selectedBacklogItems = ref([])

    onMounted(async () => {
      try {
        backlogItems.value = await store.dispatch('fetchBacklogItems')
      } catch (error) {
        console.error('Failed to fetch backlog items:', error)
      }
    })

    const createSession = async () => {
      try {
        const sessionData = {
          title: title.value,
          description: description.value,
          backlogItems: selectedBacklogItems.value.map(item => item.id)
        }
        await store.dispatch('createVotingSession', sessionData)
        emit('created')
        emit('close')
      } catch (error) {
        console.error('Failed to create voting session:', error)
      }
    }

    return {
      title,
      description,
      backlogItems,
      selectedBacklogItems,
      createSession
    }
  }
}
</script>