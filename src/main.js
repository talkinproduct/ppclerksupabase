import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Ripple from 'primevue/ripple'
import { clerkPlugin } from '@clerk/clerk-vue'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.directive('ripple', Ripple)

// Add Clerk plugin
app.use(clerkPlugin, {
  publishableKey: 'your_clerk_publishable_key'
})

app.mount('#app')