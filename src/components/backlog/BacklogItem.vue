<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Chips from 'primevue/chips'
import Button from 'primevue/button'

export default {
  components: {
    InputText,
    Textarea,
    Dropdown,
    Chips,
    Button
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'created', 'updated'],
  setup(props, { emit }) {
    const store = useStore()
    const title = ref(props.item?.title || '')
    const description = ref(props.item?.description || '')
    const priority = ref(props.item?.priority || '')
    const category = ref(props.item?.category || '')
    const tags = ref(props.item?.tags || [])

    const priorityLevels = ['Low', 'Medium', 'High', 'Critical']
    const categories = ['Feature', 'Bug', 'Improvement', 'Technical Debt']

    const saveItem = async () => {
      const itemData = {
        title: title.value,
        description: description.value,
        priority: priority.value,
        category: category.value,
        tags: tags.value
      }

      try {
        if (props.item) {
          await store.dispatch('updateBacklogItem', { id: props.item.id, ...itemData })
          emit('updated')
        } else {
          await store.dispatch('createBacklogItem', itemData)
          emit('created')
        }
        emit('close')
      } catch (error) {
        console.error('Failed to save backlog item:', error)
      }
    }

    return {
      title,
      description,
      priority,
      category,
      tags,
      priorityLevels,
      categories,
      saveItem
    }
  }
}
</script>