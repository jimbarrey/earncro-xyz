import { createApp } from 'vue'
import App from './App.vue'
import './styles/style.css';
import { router } from './router'
import AppLink from '@/components/core/AppLink'

async function main() {
    const app = createApp(App)
    app.use(router)
    await router.isReady()
    app.component('app-link', AppLink)
    app.mount('#app')
}

main()