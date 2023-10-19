// import './assets/main.css'
import router from './router/index'
import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mount('#app')
