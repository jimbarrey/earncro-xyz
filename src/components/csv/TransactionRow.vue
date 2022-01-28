<script setup>import { toRefs } from 'vue';
import formatMoney from './utils/formatMoney';


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
            <div class="text-lg font-bold tabular-nums slashed-zero">
                {{ formatMoney(transaction.amount) }} {{ transaction.currency }}
            </div>
            <div class="tabular-nums slashed-zero">
                {{ formatMoney(transaction.nativeAmount) }} {{ transaction.nativeCurrency }}
            </div>
        </div>
        <div class="td py-2 px-4 sm:border-b border-violet-900">{{ fmtDate(transaction.timestamp) }}</div>
    </div>
</template>