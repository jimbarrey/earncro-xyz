<script setup>
import UploadFile from './UploadFile.vue';
import { ref, toRefs } from 'vue';
import localForage from "localforage";
import readFile from './utils/readFile';
import UploadedFile from './utils/UploadedFile';

const props = defineProps({
    modelValue: Object,
})

const { modelValue } = toRefs(props)
const emits = defineEmits(['update:modelValue'])

const historicFiles = ref([]);
localForage.getItem(`cro.stats.files`).then(state => {
    const files = state || [];
    historicFiles.value = files.map(UploadedFile.fromLocalForage);
    if (historicFiles.value.length) {
        emits('update:modelValue', historicFiles.value[0])
    }
});

/** @param {File} file */
async function onNewFile(file) {
    const contents = await readFile(file);
    const fileObj = UploadedFile.fromFile(file, contents);
    historicFiles.value.unshift(fileObj);
    localForage.setItem(`cro.stats.files`, JSON.parse(JSON.stringify(historicFiles.value)));
    emits('update:modelValue', historicFiles.value[0])
}

function removeFile(hFile) {
    historicFiles.value = historicFiles.value.filter(x => x.id != hFile.id);
    localForage.setItem(`cro.stats.files`, JSON.parse(JSON.stringify(historicFiles.value)));
    emits('update:modelValue', historicFiles.value[0] ?? null)
}

function setFile(hFile) {
    emits('update:modelValue', hFile)
}
</script>

<template>
    <UploadFile @onFileChange="onNewFile" />

    <div v-if="historicFiles.length > 0">
        <h1 class="text-[#E02674] text-xl font-extrabold mb-2 ml-1 mt-4">Files</h1>
        <div class="flex">
            <div
                v-for="f in historicFiles"
                :key="f.id"
                class="mr-1 mb-1 text-sm border cursor-pointer flex rounded"
                :class="{
                    'border-[#E02674] text-[#E02674]': modelValue == f,
                    'text-violet-700 border-violet-900': modelValue != f
                }"
                @click="setFile(f)"
            >
                <div class="px-2 py-1">
                    <div class="font-bold">{{ f.name }}</div>
                    {{ f.transactions.length }} transactions
                </div>
                <div @click="removeFile(f)" class="px-2 py-1 hover:text-red-600">x</div>
            </div>
        </div>
    </div>
</template>