import { defineStore } from "pinia";
import * as XLSX from "xlsx";

const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    data: [], // 初始化 data 为一个空数组，用于存储提取的数据
  }),
  actions: {
    async loadExcelData(filePath) {
      try {
        // 从指定路径加载 Excel 文件
        const response = await fetch(filePath);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data); // 读取工作簿
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]; // 获取第一个工作表

        // 从第三行开始读取数据
        const range = XLSX.utils.decode_range(firstSheet["!ref"]); // 获取工作表的范围
        range.s.r = 2; // 设置起始行为第三行（索引从 0 开始）

        // 用于存储有效的行数据
        const validRows = [];

        // 从第三行开始逐行检查
        for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
          // 读取当前行的数据
          const row = XLSX.utils.sheet_to_json(firstSheet, {
            header: 1,
            range: { s: { r: rowIndex, c: 0 }, e: { r: rowIndex, c: range.e.c } }
          })[0];

          // 检查当前行是否为空
          if (row.some(cell => cell!== undefined)) {
            // 如果行不为空，将其添加到有效行数组中
            validRows.push(row);
          } else {
            // 如果行是空的，停止读取
            break;
          }
        }

        // 指定需要提取的列（索引从 0 开始）
        const columnsToExtract = [0, 2, 3, 6, 5, 12, 13];

        // 提取指定列的数据
        this.data = validRows.map(row => columnsToExtract.map(index => row[index]));

        this.setData = this.data.map(row => new Set(row));
        // console.log(this.data); // 输出提取的数据
        // console.log(this.setData);
      } catch (error) {
        console.error("Error loading Excel data:", error);
      }
    },
  },
});

export { useUserInfoStore };
