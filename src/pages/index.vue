<script setup>
import { computed, ref } from 'vue';
import SelectFile from '@/components/csv/SelectFile.vue';
import TransactionsList from '@/components/csv/TransactionsList.vue';
import Weekly from '@/components/csv/Weekly.vue';
import useResults from '@/components/csv/utils/useResults';
import formatMoney from '@/components/csv/utils/formatMoney';

const selectedFile = ref(null);
const transactions = computed(() => {
    if (selectedFile.value) {
        return selectedFile.value.transactions;
    }
    return []
});

const {
    cashback,
    stake,
    earnExtra,
    earn,
    supercharger,
    rebate,
    totalEarn,
} = useResults(transactions)

const fromDate = computed(() => {
    // last row's 
    return transactions.value[transactions.value.length - 1].timestamp;
})

const toDate = computed(() => {
    // first row's 
    return transactions.value[0].timestamp;
})

/** @param {Date} date */
function fmtDate(date) {
    return date.toLocaleDateString()
}
</script>

<template>
    <div class="page min-h-screen flex flex-col relative">
        <div class="page-fade-in contain py-2">
            <h1 class="text-violet-100 text-xl font-black tracking-wider mb-2">
                EarnCRO
            </h1>
            <p class="text-violet-300 mb-2">
                Crypto.com App transaction history viewer. Upload your history CSV file and view the total amount of staking, earn, rebate, cashback, and supercharger rewards.
            </p>
            <p class="text-violet-300">
                Made by <a href="https://twitter.com/JimBarrey" target="_blank" class="underline decoration-indigo-500 decoration-dotted decoration-2 hover:decoration-[#E02674]">@JimBarrey</a>
                - <a href="https://github.com/jimbarrey/earncro-xyz " target="_blank" class="underline decoration-indigo-500 decoration-dotted decoration-2 hover:decoration-[#E02674]">GitHub</a>
            </p>
        </div>
        <div class="page-fade-in py-10 lg:py-16 contain">
            <SelectFile
                v-model="selectedFile"
            />

            <template v-if="transactions.length">
                <h1 class="text-[#E02674] text-xl font-extrabold ml-1 mt-12">Results</h1>
                <h1 class="text-[#E02674] text-opacity-70 text-sm font-bold mb-2 ml-1">Data range
                        from <b>{{ fmtDate(fromDate) }}</b>
                        to <b>{{ fmtDate(toDate) }}</b></h1>
                
                <div v-if="totalEarn.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 mb-2 sm:mb-6 text-lg flex items-center">
                    <div class="flex-1">
                        <div class="tabular-nums slashed-zero text-xl font-black tracking-wider text-violet-100">
                            ${{ formatMoney(totalEarn.totalUSD) }}
                        </div>
                        <div>Total earned</div>
                    </div>
                    <div>
                        <b>{{ totalEarn.count }}</b> transactions<br>
                        <b class="tabular-nums slashed-zero">${{ formatMoney(totalEarn.avgUSD) }}</b> average
                    </div>
                </div>
                
                <div class="grid sm:grid-cols-3 text-sm gap-2 sm:gap-6">
                    <div v-if="stake.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200 tabular-nums slashed-zero"><b>${{ formatMoney(stake.totalUSD) }}</b></div>
                            CRO staking
                        </div>
                        <div>
                            <b>{{ stake.count }}</b> transactions<br>
                            <b class="tabular-nums slashed-zero">${{ formatMoney(stake.avgUSD) }}</b> average
                        </div>
                    </div>

                    <div v-if="earn.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200 tabular-nums slashed-zero"><b>${{ formatMoney(earn.totalUSD) }}</b></div>
                            Earn
                        </div>
                        <div>
                            <b>{{ earn.count }}</b> transactions<br>
                            <b class="tabular-nums slashed-zero">${{ formatMoney(earn.avgUSD) }}</b> average
                        </div>
                    </div>

                    <div v-if="earnExtra.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200 tabular-nums slashed-zero"><b>${{ formatMoney(earnExtra.totalUSD) }}</b></div>
                            Earn (extra)
                        </div>
                        <div>
                            <b class="tabular-nums slashed-zero">{{ formatMoney(earnExtra.total) }}</b> CRO<br>
                            <b>{{ earnExtra.count }}</b> transactions<br>
                            <b class="tabular-nums slashed-zero">${{ formatMoney(earnExtra.avgUSD) }}</b> average
                        </div>
                    </div>

                    <div v-if="cashback.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200 tabular-nums slashed-zero"><b>${{ formatMoney(cashback.totalUSD) }}</b></div>
                            Cashback
                        </div>
                        <div>
                            <b class="tabular-nums slashed-zero">{{ formatMoney(cashback.total) }}</b> CRO<br>
                            <b>{{ cashback.count }}</b> transactions<br>
                            <b class="tabular-nums slashed-zero">${{ formatMoney(cashback.avgUSD) }}</b> average
                        </div>
                    </div>

                    <div v-if="rebate.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200 tabular-nums slashed-zero"><b>${{ formatMoney(rebate.totalUSD) }}</b></div>
                            Rebate
                        </div>
                        <div>
                            <b class="tabular-nums slashed-zero">{{ formatMoney(rebate.total) }}</b> CRO<br>
                            <b>{{ rebate.count }}</b> transactions<br>
                            <b class="tabular-nums slashed-zero">${{ formatMoney(rebate.avgUSD) }}</b> average
                        </div>
                    </div>

                    <div v-if="supercharger.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200 tabular-nums slashed-zero"><b>${{ formatMoney(supercharger.totalUSD) }}</b></div>
                            Supercharge
                        </div>
                        <div>
                            <b>{{ supercharger.count }}</b> transactions<br>
                            <b class="tabular-nums slashed-zero">${{ formatMoney(supercharger.avgUSD) }}</b> average
                        </div>
                    </div>
                </div>

                <h1 class="text-[#E02674] text-xl font-extrabold ml-1 mt-12 mb-1">Weekly</h1>
                <Weekly :transactions="transactions" />

                <h1 class="text-[#E02674] text-xl font-extrabold ml-1 mt-12 mb-1">Transactions</h1>
                <div class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl">
                    <TransactionsList :transactions="transactions" />
                </div>
            </template>
        </div>
    </div>
</template>