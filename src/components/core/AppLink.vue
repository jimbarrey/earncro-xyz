<template>
    <router-link
        v-bind="$props"
        v-slot="{ isActive, href, navigate }"
        :custom="true"
    >
        <a
            v-bind="$attrs"
            :href="href"
            @click="navigate"
            :class="isActive ? activeClass : inactiveClass"
        >
            <slot />
        </a>
    </router-link>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    name: 'AppLink',
    props: {
        ...RouterLink.props,
        inactiveClass: String,
    },
}
</script>
