// src/stores/cyrs.js
import { defineStore } from 'pinia';
import * as XLSX from 'xlsx';

export const useCyrsStore = defineStore('cyrs', {
  state: () => ({
    data: [],
  }),
  actions: {
    async loadExcelData(file) {
      const fileReader = new FileReader();
      console.log("enter cyrs");

      fileReader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // 定义要读取的行和列（下标）
        const rowIndex = 9; // 第10行（下标从0开始）
        const columnIndexes = [2, 3, 4]; // C列、D列、E列对应的下标

        // 读取数据并赋值到 state.data 中
        this.data = columnIndexes.map(colIndex => {
          const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex }); // 创建单元格地址
          return worksheet[cellAddress]?.v || 0; // 如果没有值则默认0
        });
      };
      console.log(this.data);

      fileReader.readAsBinaryString(file);
    },
  },
});
