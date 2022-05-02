import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from '@/App.vue'
import router from '@/router/router.js'
import store from '@/store/store.js'
import i18n from '@/i18n/i18n.js'
import JsonViewer from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'
import { GesturePlugin } from '@vueuse/gesture'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.use(createHead())
app.use(JsonViewer)
app.use(GesturePlugin)

app.mount('#app')

window.app = app
