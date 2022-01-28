<script setup>
import localforage from 'localforage';
import { ref } from 'vue';

const emits = defineEmits(['onFileChange'])

const fileInput = ref(null)
async function onFileChange(e) {
    const file = e.target.files[0];
    emits('onFileChange', file);
    fileInput.value = null;
    await localforage.setItem('cro.stats.showHelp', 'false');
    showHelp.value = false;
}

const showHelp = ref(false)
localforage.getItem('cro.stats.showHelp').then(x => showHelp.value = x !== 'false');
</script>

<template>
    <h1 class="text-[#E02674] text-xl font-extrabold mb-2 ml-1">Upload transaction history</h1>

    <div class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] rounded-xl p-4">
        <form class="flex items-center space-x-6">
            <div class="shrink-0">
                <svg class="h-8 w-8 object-cover rounded-full" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M10 19L12 15H9V10H15V15L13 19H10"
                    />
                </svg>
            </div>
            <label class="block">
                <span class="sr-only">Upload CSV</span>
                <input
                    ref="fileInput"
                    @change="onFileChange"
                    type="file"
                    accept=".csv"
                    class="block w-full text-sm text-violet-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-900 file:text-violet-300 hover:file:bg-violet-800"
                />
            </label>
        </form>
    </div>


    <a v-if="showHelp" href="https://help.crypto.com/en/articles/3438579-how-do-i-export-my-transaction-history-app" target="_blank" class="bg-[#160c32] border border-[#2c1f51] text-[#b2a7f1] opacity-80 hover:opacity-100 transition rounded-xl flex items-center mt-2">
        <img class="h-full w-40" src="/img/faq.png" height="50" alt="">
        <div class="flex-1 p-4">
            <div class="font-bold text-violet-200">
                How do I export my transaction history? (App)
            </div>
            <div class="text-violet-300 text-opacity-50 underline flex items-center">
                <img class="w-4 mr-2" src="/favicon-32x32.png" height="32" alt="">
                https://help.crypto.com/en/articles/3438579-how-do-i-export-my-transaction-history-app
            </div>
        </div>
    </a>

</template> 