<template>
  <div class="table-container" ref="tableContainer">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in visibleRows" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: ['Header 1', 'Header 2', 'Header 3', 'Header 4'],
      rows: [
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
        ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
        ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
        ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
        ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
        ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
        ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
        ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],

        // ... 更多数据行
      ],
      visibleRows: [],
      scrollIndex: 0,
      visibleRowCount: 10,
    };
  },
  mounted() {
    this.initVisibleRows();
    this.startAutoScroll();
  },
  beforeDestroy() {
    this.stopAutoScroll();
  },
  methods: {
    initVisibleRows() {
      this.visibleRows = this.rows.slice(0, this.visibleRowCount);
    },
    startAutoScroll() {
      this.scrollInterval = setInterval(() => {
        this.scrollIndex++;
        if (this.scrollIndex + this.visibleRowCount > this.rows.length) {
          this.scrollIndex = 0;
        }
        this.visibleRows = this.rows.slice(
          this.scrollIndex,
          this.scrollIndex + this.visibleRowCount
        );
      }, 2000); // 滚动间隔时间（毫秒）
    },
    stopAutoScroll() {
      clearInterval(this.scrollInterval);
    },
  },
};
</script>

<style scoped>
.table-container {
  height: 400px; /* 根据需要调整高度 */
  overflow: hidden;
  position: relative;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f4f4f4;
}
</style>