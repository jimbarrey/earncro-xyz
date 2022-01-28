import { computed } from "vue";

export default function useResults(transactions) {

    function resultsByType(type) {
        let total = 0;
        let totalUSD = 0;
        let count = 0;
        for (const t of transactions.value) {
            if (t.transactionKind === type) {
                total += t.amount;
                totalUSD += t.nativeAmountInUSD;
                count++;
            }
        }

        const avg = total / count;
        const avgUSD = totalUSD / count;

        return {
            total,
            totalUSD,
            avg,
            avgUSD,
            count,
        }
    }


    const cashback = computed(() => {
        return resultsByType('referral_card_cashback')
    })
    const stake = computed(() => {
        return resultsByType('mco_stake_reward')
    })
    const earnExtra = computed(() => {
        return resultsByType('crypto_earn_extra_interest_paid')
    })
    const earn = computed(() => {
        return resultsByType('crypto_earn_interest_paid')
    })
    const supercharger = computed(() => {
        return resultsByType('supercharger_reward_to_app_credited')
    })
    const rebate = computed(() => {
        return resultsByType('reimbursement')
    })
    const totalEarn = computed(() => {
        return {
            totalUSD: cashback.value.totalUSD + earn.value.totalUSD + earnExtra.value.totalUSD + stake.value.totalUSD + rebate.value.totalUSD + supercharger.value.totalUSD,
            avgUSD: (cashback.value.avgUSD + earn.value.avgUSD + earnExtra.value.avgUSD + stake.value.avgUSD + rebate.value.avgUSD + supercharger.value.avgUSD) / 6,
            count: cashback.value.count + earn.value.count + earnExtra.value.count + stake.value.count + rebate.value.count,
        }
    })

    return {
        cashback,
        stake,
        earn,
        earnExtra,
        supercharger,
        rebate,
        totalEarn,
    }
}