import { defineStore } from "pinia"
import * as XLSX from "xlsx";

const useUserInfoStore = defineStore('userInfo', {
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
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]; // 获取第一个工作表

        // 从第三行开始读取数据，直到最后一行
        const range = XLSX.utils.decode_range(firstSheet["!ref"]); // 获取工作表的范围
        range.s.r = 2; // 设置起始行为第三行（索引从0开始）
        range.e.r = 46;

        // 将工作表转换为JSON格式，从第三行开始读取
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, range }); // 以数组形式返回每行

        // 指定需要提取的列（索引从0开始）
        const columnsToExtract = [0, 2, 3, 6, 5, 12, 13];

        // 提取指定列的数据
        this.data = jsonData.map(row => columnsToExtract.map(index => row[index]));

        console.log(this.data); // 输出提取的数据
      } catch (error) {
        console.error("Error loading Excel data:", error);
      }
    },
  },
});
export { useUserInfoStore };
