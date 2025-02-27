<template>
    <div flex="main:center" style="height: 500px;">
        <bv-scroll-table :config="config" ></bv-scroll-table>
    </div>
</template>


<script setup>
import { reactive,onMounted } from 'vue';
import { useConInfoStore } from '@/stores/conList';

const store = useConInfoStore();

const config = reactive({
    header: ['列1', '列2', '列3'],
    data: store.data,
    index: true,
    columnWidth:[50],
    align: ["center"],
    indexHeader: "序号",
});
// console.log("企业");



onMounted(async () => {
  try {
    console.log("企业1");
    await store.loadExcelData("src/assets/参访企业.xlsx");
    config.data = store.data;
  } catch (error) {
    console.error("Failed to load Excel data:", error);
  }
  console.log("企业");
});

</script>

<style scoped>

</style>
