import { defineStore } from "pinia";
import * as XLSX from 'xlsx';

const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    username: '赫赫',
    age: 30,
    like: 'girl',
    obj: { money: 100, friend: 10 },
    data: [],
    hobby: [
      { id: 1, name: '篮球', level: 1 },
      { id: 2, name: 'rap', level: 10 }
    ]
  }),
  actions: {
    async loadExcelData(filePath) {
      const response = await fetch(filePath);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data);
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 ,range : 2}); // 以数组形式返回每行
      const columnsToExtract = [2, 6, 5];
      this.data = jsonData.map(row => columnsToExtract.map(index => row[index])); // 提取指定列的数据
    }
  },
});

export { useUserInfoStore };
