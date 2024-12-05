import { defineStore } from 'pinia';
import * as XLSX from 'xlsx';

export const useExcelDataStore = defineStore('excelData', {
    state: () => ({
        totalDistance: 0 // 存储累加后的数量
    }),
    actions: {
        async loadAndSumDistance(filePath) {
          console.log("enter pinia");

            const response = await fetch(filePath);
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // 累加第七列的数据
            for (let i = 2; i < 9; i++) {
              this.totalDistance += parseFloat(jsonData[i][6]);
            }
            console.log(this.totalDistance);
        }
    }
});
