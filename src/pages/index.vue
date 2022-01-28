<script setup>
import { computed, ref } from 'vue';
import SelectFile from '@/components/csv/SelectFile.vue';
import TransactionsList from '@/components/csv/TransactionsList.vue';
import Weekly from '@/components/csv/Weekly.vue';
import useResults from '@/components/csv/utils/useResults';

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
                        <div class="text-xl font-black tracking-wider proportional-nums text-violet-100">
                            ${{ totalEarn.totalUSD.toFixed(2) }}
                        </div>
                        <div>Total earned</div>
                    </div>
                    <div>
                        <b>{{ totalEarn.count }}</b> purchases<br>
                        <b>${{ totalEarn.avgUSD.toFixed(2) }}</b> average
                    </div>
                </div>
                
                <div class="grid sm:grid-cols-3 text-sm gap-2 sm:gap-6">
                    <div v-if="stake.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200"><b>${{ stake.totalUSD.toFixed(2) }}</b></div>
                            CRO staking
                        </div>
                        <div>
                            <b>{{ stake.count }}</b> purchases<br>
                            <b>${{ stake.avgUSD.toFixed(2) }}</b> average
                        </div>
                    </div>

                    <div v-if="earn.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200"><b>${{ earn.totalUSD.toFixed(2) }}</b></div>
                            Earn
                        </div>
                        <div>
                            <b>{{ earn.count }}</b> purchases<br>
                            <b>${{ earn.avgUSD.toFixed(2) }}</b> average
                        </div>
                    </div>

                    <div v-if="earnExtra.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200"><b>${{ earnExtra.totalUSD.toFixed(2) }}</b></div>
                            Earn (extra)
                        </div>
                        <div>
                            <b>{{ earnExtra.total.toFixed(2) }}</b> CRO<br>
                            <b>{{ earnExtra.count }}</b> purchases<br>
                            <b>${{ earnExtra.avgUSD.toFixed(2) }}</b> average
                        </div>
                    </div>

                    <div v-if="cashback.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200"><b>${{ cashback.totalUSD.toFixed(2) }}</b></div>
                            Cashback
                        </div>
                        <div>
                            <b>{{ cashback.total.toFixed(2) }}</b> CRO<br>
                            <b>{{ cashback.count }}</b> purchases<br>
                            <b>${{ cashback.avgUSD.toFixed(2) }}</b> average
                        </div>
                    </div>

                    <div v-if="rebate.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200"><b>${{ rebate.totalUSD.toFixed(2) }}</b></div>
                            Rebate
                        </div>
                        <div>
                            <b>{{ rebate.total.toFixed(2) }}</b> CRO<br>
                            <b>{{ rebate.count }}</b> purchases<br>
                            <b>${{ rebate.avgUSD.toFixed(2) }}</b> average
                        </div>
                    </div>

                    <div v-if="supercharger.count" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4 flex flex-col">
                        <div class="flex-1 mb-2">
                            <div class="text-lg font-black text-violet-200"><b>${{ supercharger.totalUSD.toFixed(2) }}</b></div>
                            Supercharge
                        </div>
                        <div>
                            <b>{{ supercharger.count }}</b> purchases<br>
                            <b>${{ supercharger.avgUSD.toFixed(2) }}</b> average
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