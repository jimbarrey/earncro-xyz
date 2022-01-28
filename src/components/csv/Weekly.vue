<script setup>
import { computed, ref, toRefs } from 'vue';
import { getISOWeekYear, getISOWeek } from 'date-fns'
import Week from './Week.vue';

const props = defineProps({
    transactions: [Array, Object],
})
const { transactions } = toRefs(props)

const transactionsPerWeek = computed(() => {
    const transactionsByWeek = {}
    for (const transaction of transactions.value) {
        const week = `${getISOWeekYear(transaction.timestamp)}-${getISOWeek(transaction.timestamp)}`
        if (!transactionsByWeek[week]) {
            transactionsByWeek[week] = []
        }
        transactionsByWeek[week].push(transaction)
    }
    return transactionsByWeek
})

const weeks = computed(() => {
    const weeks = []
    for (const week in transactionsPerWeek.value) {
        weeks.push(week)
    }
    return weeks
})

const skip = ref(0)

function prevPage() {
    skip.value--
    if (skip.value <= 0) {
        skip.value = 0
    }
}

function nextPage() {
    skip.value++
    if (skip.value > weeks.value.length - 1) {
        skip.value = weeks.value.length - 1
    }
}
</script>

<template>
    <div class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4">
        <div class="grid sm:grid-cols-7">
            <div class="hidden sm:block select-none">
                <h2 class="text-sm text-violet-500 font-black tracking-wider flex items-center justify-between -ml-2 mr-2 -my-0.5">
                    <div @click="prevPage" class="flex items-center text-center justify-center cursor-pointer text-red-500 hover:text-red-100 active:text-white active:scale-125 transition py-1 px-2">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </div>
                    <div class="opacity-50">
                        {{ skip }} / {{ weeks.length }}
                    </div>
                    <div @click="nextPage" class="flex items-center text-center justify-center cursor-pointer text-red-500 hover:text-red-100 active:text-white active:scale-125 transition py-1 px-2">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </div>
                </h2>
                <div class="py-1 last:border-b-0 border-b border-violet-900 text-lg text-violet-100 font-bold">
                    Total
                </div>
                <div class="py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">
                    CRO staking
                </div>
                <div class="py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">
                    Earn
                </div>
                <div class="py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">
                    Earn (extra)
                </div>
                <div class="py-1 last:border-b-0 border-b border-violet-900 text-violet-300 font-semibold">
                    Cashback
                </div>
            </div>
            <Week
                v-for="week in weeks.slice(skip, skip + 6)"
                :key="week"
                :week="week"
                :transactions="transactionsPerWeek[week]"
            />
        </div>
    </div>
</template>