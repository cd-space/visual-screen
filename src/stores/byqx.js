// src/stores/byqx.js
import { defineStore } from 'pinia';
import * as XLSX from 'xlsx';

export const useByqxStore = defineStore('byqx', {
  state: () => ({
    employmentCounts: {
      job: 0,
      study: 0,
    },
  }),
  actions: {
    async loadData(file) {
      const data = await this.readExcelFile(file);
      this.processData(data);
    },
    readExcelFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const binaryStr = event.target.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheetName = workbook.SheetNames[0]; // 获取第一个工作表
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 ,range : 2}); // 将工作表转换为 JSON 格式
          resolve(json);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsBinaryString(file); // 读取文件为二进制字符串
      });
    },
    processData(data) {
      this.employmentCounts.job = 0;
      this.employmentCounts.study = 0;

      data.forEach((row, index) => {
        if (index === 0) return; // Skip header row

        const status = row[9]; // 第十列的索引是 9
        if (status === '就业') {
          this.employmentCounts.job += 1;
        } else if (status === '考研') {
          this.employmentCounts.study += 1;
        }
      });
    },
  },
});
