<template>
  <SeamlessScroll :items="tableData" class="scroll-table">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(col, index) in columns" :key="index">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td v-for="(col, idx) in row" :key="idx">{{ col }}</td>
        </tr>
      </tbody>
    </table>
  </SeamlessScroll>
</template>

<script>
import { defineComponent } from "vue";
import SeamlessScroll from "vue3-seamless-scroll";

export default defineComponent({
  name: "ScrollableTable",
  components: {
    SeamlessScroll,
  },
  data() {
    return {
      columns: ["姓名", "年龄", "城市", "职位"],
      tableData: [
        ["张三", 28, "北京", "前端工程师"],
        ["李四", 34, "上海", "后端工程师"],
        ["王五", 25, "广州", "UI设计师"],
        ["赵六", 40, "深圳", "产品经理"],
        ["钱七", 29, "杭州", "数据分析师"],
        // 可以继续增加数据
      ],
    };
  },
});
</script>

<style scoped>
.scroll-table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f4f4f4;
  position: sticky;
  top: 0;
  z-index: 1; /* 确保表头不被遮挡 */
}
</style>
