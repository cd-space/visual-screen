import { defineStore } from "pinia";
import * as XLSX from "xlsx";

const useConInfoStore = defineStore("conInfo", {
  state: () => ({
    data: [], // 初始化 data 为一个空数组，用于存储提取的数据
  }),
  actions: {
    async loadExcelData(filePath) {
      try {
        // 从指定路径加载Excel文件
        const response = await fetch(filePath);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data); // 读取工作簿
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]; // 获取第一个工作表 // 从第三行开始读取数据

        const range = XLSX.utils.decode_range(firstSheet["!ref"]); // 获取工作表的范围
        range.s.r = 1; // 设置起始行为第三行（索引从0开始） // 初始化一个空数组来存储有效的行

        const validRows = []; // 从第三行开始逐行检查

        for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
          const row = XLSX.utils.sheet_to_json(firstSheet, {
            header: 1,
            range: {
              s: { r: rowIndex, c: 0 },
              e: { r: rowIndex, c: range.e.c },
            },
          })[0]; // 检查当前行是否为空
          if (row.some((cell) => cell !== undefined)) {
            validRows.push(row);
          } else {
            // 如果当前行为空，停止读取
            break;
          }
        } // 指定需要提取的列（索引从0开始），并对应上 key

        const columnsToExtract = [
          { index: 1, key: "company" },
          { index: 2, key: "number" },
          { index: 5, key: "date" },
          { index: 7, key: "link" },
          { index: 0, key:"id" },
        ]; // 提取指定列的数据，并转换为字典形式

        this.data = validRows.map((row) => {
          const obj = {};
          columnsToExtract.forEach((column) => {
            obj[column.key] = row[column.index];
          });
          return obj;
        }); // 这里你之前的 this.setData 逻辑可能需要根据新的数据结构调整，这里先注释掉 // this.setData = this.data.map(row => new Set(row));

        console.log(this.data);
      } catch (error) {
        console.error("Error loading Excel data:", error);
      }
    },
  },
});

export { useConInfoStore };
