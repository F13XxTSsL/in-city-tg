import './assets/main.css'

import {createApp, watchEffect} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './plugins/validation'
import {useTelegram} from "../composables/useTelegram";





const { tg } = useTelegram()

watchEffect(() => {
    tg.ready()

})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
