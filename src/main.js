import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 全域樣式
import './assets/stylesheets/all.scss'

// 外部套件 JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Swiper CSS
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
