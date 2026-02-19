import './assets/main.css'
import './assets/bootstrap.css'
import './assets/theme.css'
import './assets/icons/bootstrap-icons.css'
import './assets/bootstrap-5.3.7/js/bootstrap.bundle.min.js'

// PrimeIcons (ONLY required CSS)
import 'primeicons/primeicons.css'

// Vue
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Icons
import * as icons from 'lucide-vue-next'

//toast
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)


for (const [key, component] of Object.entries(icons)) {
    app.component(key, component)
}

app.mount('#app')
