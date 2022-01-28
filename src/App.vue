<script setup>
import LoadBar from '@/components/core/LoadBar.vue'
import NotificationPanel from '@/components/core/NotificationPanel.vue'
import axiosProgress from '@/utils/http/axiosProgress'
import { computed } from 'vue'

const progressWidth = computed(() => {
    return axiosProgress.state.progress
})
</script>

<template>
    <div
        v-if="$route"
        class="min-h-screen flex flex-col"
    >
         <transition
            enter-from-class="opacity-0"
            enter-active-class="transition ease duration-300"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition ease duration-300"
            leave-to-class="opacity-0"
            appear
        >
            <LoadBar
                v-if="progressWidth"
                class="z-50 fixed top-0 inset-x-0 h-0.5 bg-yellow-500"
            />
        </transition>
        <RouterView v-slot="{ Component }">
            <transition
                enter-active-class="route-enter-active-class"
                enter-from-class="route-enter-from-class"
                enter-to-class="route-enter-to-class"
                appear
            >
                <!-- add .page-fade-in to elements you want to be transitioned -->
                <component :is="Component" />
            </transition>
        </RouterView>
    </div>

    <NotificationPanel />
</template>
