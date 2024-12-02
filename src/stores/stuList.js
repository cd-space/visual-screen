// import { defineStore } from 'pinia';
// import * as XLSX from 'xlsx';

// export const useStuListStore = defineStore('stuList', {
//     state: () => ({
//         data: [] // 初始化state
//     }),
//     actions: {
//         async loadExcelData(filePath) {
//             const xhr = new XMLHttpRequest();
//             xhr.open('GET', filePath);
//             xhr.responseType = 'arraybuffer';
//             try {
//                 await new Promise((resolve, reject) => {
//                     xhr.onload = resolve;
//                     xhr.onerror = reject;
//                     xhr.send();
//                 });
//                 if (xhr.status === 200) {
//                     const data = new Uint8Array(xhr.response);
//                     const workbook = XLSX.read(data, { type: 'array' });
//                     const sheetName = workbook.SheetNames[0];
//                     const sheet = workbook.Sheets[sheetName];
//                     const json = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 2 });
//                     const filteredData = json.map(row => [row[2], row[6], row[5]]);
//                     this.data = filteredData; // 更新state
//                 } else {
//                     console.error('Failed to load the file');
//                 }
//             } catch (error) {
//                 console.error('Request error:', error);
//             }
//         }
//     }
// });

import { defineStore } from 'pinia';
import * as XLSX from 'xlsx';

export const useStuListStore = defineStore('stuList', {
    state: () => ({
        data: []
    }),
    actions: {
        async loadExcelData(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.arrayBuffer();
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                // 从第三行开始读取数据
                const json = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 2 });
                const filteredData = json.map(row => [row[2], row[6], row[5]]);
                this.data = filteredData; // 设置处理后的数据
                return filteredData; // 返回处理后的数据
            } catch (error) {
                console.error('Failed to load the file', error);
                throw error; // 抛出错误，以便可以在调用处处理
            }
        }
    }
});
