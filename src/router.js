import { createRouter, createWebHistory } from 'vue-router'
import { addRouteToHistory } from './utils/routeHistory'

export const routerHistory = createWebHistory()
export const router = createRouter({
    scrollBehavior() {
        return { left: 0, top: 0 }
    },
    history: routerHistory,
    strict: true,
    routes: [
        {
            path: '/',
            component: () =>
                import(
                    /* webpackPrefetch: true, webpackChunkName: 'chunk-index' */ '@/pages/index.vue'
                ),
            meta: {
                hideConnect: true,
            },
        },
        {
            path: '/:catchAll(.*)',
            component: () =>
                import(
                    /* webpackPrefetch: true, webpackChunkName: 'chunk-404' */ '@/pages/404.vue'
                ),
        },
    ],
})

router.afterEach((to, from, failure) => {
    if (!failure) addRouteToHistory(to, from)
})