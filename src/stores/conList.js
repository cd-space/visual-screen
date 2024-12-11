import { defineStore } from "pinia";
import * as XLSX from 'xlsx';

const useConInfoStore = defineStore('conInfo', {
  state: () => ({
  }),
  actions: {
    async loadExcelData(filePath) {
      const response = await fetch(filePath);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data);
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 ,range : 2}); // 以数组形式返回每行
      const columnsToExtract = [0, 1, 5];
      this.data = jsonData.map(row => columnsToExtract.map(index => row[index])); // 提取指定列的数据
    }
  },
});

export { useConInfoStore };
