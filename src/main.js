import { createApp } from 'vue'
import App from './App.vue'
import './styles/style.css';
import { createHead } from '@vueuse/head'
import { router } from './router'
import AppLink from '@/components/core/AppLink'

async function main() {
    const app = createApp(App)
    const head = createHead()
    app.use(router)
    app.use(head)
    await router.isReady()
    app.component('app-link', AppLink)
    app.mount('#app')
}

main()