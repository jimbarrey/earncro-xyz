<script setup>import { toRefs } from 'vue';


const props = defineProps({
    transaction: [Array, Object],
})
const { transaction } = toRefs(props)

/** @param {Date} date */
function fmtDate(date) {
    return date.toLocaleDateString()
}
</script>

<template>
    <div class="flex flex-col sm:table-row border-b border-violet-900 sm:border-none">
        <div class="td py-2 px-4 sm:border-b border-violet-900">
            <div class="text-lg font-bold">{{ transaction.description }}</div>
            <div>{{ transaction.transactionKind }}</div>
        </div>
        <div class="td py-2 px-4 sm:border-b border-violet-900">
            <div class="text-lg font-bold">
                {{ transaction.amount }} {{ transaction.currency }}
            </div>
            <div>
                {{ transaction.nativeAmount }} {{ transaction.nativeCurrency }}
            </div>
        </div>
        <div class="td py-2 px-4 sm:border-b border-violet-900">{{ fmtDate(transaction.timestamp) }}</div>
    </div>
</template>