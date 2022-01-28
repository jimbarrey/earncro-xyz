<script setup>
import { computed, ref, toRefs } from 'vue';
import VisibilityTrigger from '@/components/core/VisibilityTrigger.vue';
import TransactionRow from './TransactionRow.vue';

const props = defineProps({
    transactions: [Array, Object],
})
const { transactions } = toRefs(props)

const page = ref(0)
const perPage = ref(12)
const hasMorePages = computed(() => {
    return page.value < transactions.value.length / perPage.value
})

</script>

<template>
    <div class="sm:table w-full text-violet-300">
        <div class="sm:table-row-group">
            <TransactionRow
                v-for="(t, i) in transactions.slice(0, (page + 1) * perPage)"
                :key="i"
                :transaction="t"
            />
        </div>
    </div>

    <div
        v-if="hasMorePages"
        @click="page = page + 1"
        class="mt-2 text-center py-2 px-4 w-full block bg-gray-800 border border-gray-700 hover:border-blue-500 text-gray-100 hover:text-white transition rounded-xl"
    >
        <VisibilityTrigger @enter="page = page + 1" />Load more
    </div>
</template>