<template>
    <span />
</template>

<script>

/**
 * Emits enter or leave when component is visible in viewport
 */
export default {
    props: {
        rootMargin: { type: String, default: '30%' },
    },
    data() {
        return {
            observer: null,
        }
    },
    mounted() {
        if (!('IntersectionObserver' in window)) {
            return
        }
        this.observer = new window.IntersectionObserver((entries) => {
            const element = entries[0]
            if (element.isIntersecting) {
                this.$emit('enter')
            } else {
                this.$emit('leave')
            }
        }, {
            rootMargin: this.rootMargin,
        })
        this.observer.observe(this.$el)
    },
    unmounted() {
        if (this.observer) {
            this.observer.disconnect()
        }
    }, 
}
</script>