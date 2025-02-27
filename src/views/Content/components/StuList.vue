<template>
  <div flex="main:center" style="height: 500px;">
    <bv-scroll-table :config="config"></bv-scroll-table>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/stulist.js";

const store = useUserInfoStore();


// 定义响应式数据
const config = reactive({
  header: ["列1", "列2", "列3"],
  data: [],
  index: true,
  columnWidth: [50],
  align: ["center"],
  indexHeader: "序号",
});

onMounted(async () => {
  try {
    await store.loadExcelData("src/assets/学生第二期.xlsx");
    config.data = store.data;
    console.log(config.data)
  } catch (error) {
    console.error("Failed to load Excel data:", error);
  }
});
console.log(config.data)

</script>



<style scoped></style>
