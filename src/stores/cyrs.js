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
  }),
  actions: {
    // 加载并整理数据
    async loadStudentData() {
      //console.log("loadStudentData called");
      
      try {
        const response = await fetch('src/assets/参访企业.xlsx');
        if (!response.ok) {
          console.error("加载文件失败，状态码:", response.status);
          return;
        }
    
        const arrayBuffer = await response.arrayBuffer();
        //console.log("文件加载成功，开始解析...");
    
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        //console.log("解析后的工作簿:", workbook);
    
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
    
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        //console.log("JSON 数据:", jsonData);

        // 初始化统计变量
        let total = 0;
        let male = 0;
        let female = 0;

        // 初始化数组用于存储日期和参访里程
        const visitStats = [["date", "distance"]]; 

        // 遍历每一行数据
        for (let i = 2; i < jsonData.length; i++) { // 假设数据从第3行开始
          const row = jsonData[i];

          // 确保数据行有效
          if (row.length >= 7) {
            // 处理总人数、男生、女生数据
            const currentTotal = parseInt(row[1]) || 0;  // 总人数
            const currentMale = parseInt(row[3]) || 0;   // 男生
            const currentFemale = parseInt(row[4]) || 0; // 女生

            total += currentTotal;
            male += currentMale;
            female += currentFemale;

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

        //console.log("整理后的 CYRS 数据:", this.CYRSData.source);
        //console.log("整理后的 CFLC 数据:", this.CFLCData.source);
        
      } catch (error) {
        console.error("加载 Excel 文件失败：", error);
      }
    },
  },
});
