<script setup>
import { endOfISOWeek, format, isSameMonth, parse, startOfISOWeek } from 'date-fns';
import { computed, toRefs } from 'vue';
import useResults from './utils/useResults';

const props = defineProps({
    week: String,
    transactions: [Array, Object],
})
const { transactions } = toRefs(props)


const {
    cashback,
    stake,
    earnExtra,
    earn,
    totalEarn,
} = useResults(transactions)

const weekFormatted = computed(() => {
    const date = parse(props.week, 'RRRR-II', new Date())
    // show start and end of week
    const start = startOfISOWeek(date)
    const end = endOfISOWeek(date)
    if (isSameMonth(start, end)) {
        return format(start, 'dd') + ' - ' + format(end, 'dd MMM')
    }
    return format(start, 'dd MMM') + ' - ' + format(end, 'dd MMM')
})

</script>

<template>
    <div class="flex-1">
        <h2 class="text-violet-500 text-sm font-black tracking-wider whitespace-nowrap truncate">{{ weekFormatted }}</h2>
        <div class="py-1 last:border-b-0 border-b border-violet-900 text-lg text-violet-100 font-bold">${{ totalEarn.totalUSD.toFixed(2) }}</div>
        <div class="hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ stake.totalUSD.toFixed(2) }}</div>
        <div class="hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ earn.totalUSD.toFixed(2) }}</div>
        <div class="hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ earnExtra.totalUSD.toFixed(2) }}</div>
        <div class="hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ cashback.totalUSD.toFixed(2) }}</div>
    </div>
</template>