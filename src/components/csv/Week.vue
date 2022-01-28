<script setup>
import { endOfISOWeek, format, isSameMonth, parse, startOfISOWeek } from 'date-fns';
import { computed, toRefs } from 'vue';
import formatMoney from './utils/formatMoney';
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
        <h2 class="text-violet-500 text-right text-sm font-black tracking-wider whitespace-nowrap truncate">{{ weekFormatted }}</h2>
        <div class="tabular-nums text-right slashed-zero py-1 last:border-b-0 border-b border-violet-900 text-lg text-violet-100 font-bold">${{ formatMoney(totalEarn.totalUSD) }}</div>
        <div class="tabular-nums text-right slashed-zero hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ formatMoney(stake.totalUSD) }}</div>
        <div class="tabular-nums text-right slashed-zero hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ formatMoney(earn.totalUSD) }}</div>
        <div class="tabular-nums text-right slashed-zero hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ formatMoney(earnExtra.totalUSD) }}</div>
        <div class="tabular-nums text-right slashed-zero hidden sm:block py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">${{ formatMoney(cashback.totalUSD) }}</div>
    </div>
</template>