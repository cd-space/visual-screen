import { defineStore } from 'pinia';
import * as XLSX from 'xlsx';

export const useCYRSStore = defineStore('xlsx', {
  state: () => ({
    CYRSData: {
      source: [
        ["category", "value"], // 存储总人数、男生、女生数据
      ],
    },
    CFLCData: {
      source: [
        ["date", "distance"], // 存储日期和参访里程数据
      ],
    },
    LJSL: [], // 用于存储企业数量
  }),
  actions: {
    // 加载并整理数据
    async loadStudentData() {
      try {
        const response = await fetch('参访企业new.xlsx');
        if (!response.ok) {
          console.error("加载文件失败，状态码:", response.status);
          return;
        }

        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log("JSON 数据:", jsonData);

        // 初始化统计变量
        let total = 0;
        let male = 0;
        let female = 0;

        // 初始化数组用于存储日期和参访里程
        const visitStats = [["date", "distance"]]; 

        // 统计企业数量
        const enterpriseCount = jsonData.length - 1; // 去掉标题行、表头行和总计行
        this.LJSL = [enterpriseCount];

        // 遍历每一行数据，从第3行开始到倒数第2行结束
        for (let i = 1; i < jsonData.length ; i++) { 
          const row = jsonData[i];

          // 确保数据行有效
          if (row.length >= 7) {
            // 处理总人数、男生、女生数据
           
            const currentMale = parseInt(row[3]) || 0;   // 男生
            const currentFemale = parseInt(row[4]) || 0; // 女生

          
            male += currentMale;
            female += currentFemale;
            total= male+female

            // 处理日期和参访里程数据
            const date = row[5]; // 假设日期在第6列
            const distance = row[6]; // 假设参访里程在第7列
            visitStats.push([date, distance]);
          }
        }

        // 更新 Pinia 状态
        this.CYRSData.source = [
          ["category", "value"],
          ["总人数", total],
          ["男生", male],
          ["女生", female],
        ];
        this.CFLCData.source = visitStats;


        
      } catch (error) {
        console.error("加载 Excel 文件失败：", error);
      }
    },
  },
});