import { defineStore } from 'pinia';
import * as XLSX from 'xlsx';

export const useChartDataStore = defineStore('chartData', {
  state: () => ({
    studentData: {
      source: [
        ['zy', '2021', '2022', '2023', '2024'],
        [] // 初始为空，后面根据专业和年级填充数据
      ],
    },
    byqx: {
      source: [
        { value: 0, name: '就业' },
        { value: 0, name: '考研' },    
      ]
    }
  }),
  actions: {

    async loadStudentData() {
      try {
        const response = await fetch('学生第二期.xlsx');
        if (!response.ok) {
          console.error("加载文件失败，状态码:", response.status);
          return;
        }

        const arrayBuffer = await response.arrayBuffer();
        const data1 = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data1, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        //console.log("JSON 数据:", jsonData);

        // 更新 `studentData`
        this.updateStudentData(jsonData);

      } catch (error) {
        console.error("加载 Excel 文件失败：", error);
      }
    },

    updateStudentData(data) {
      const result = {};
      const byqx = { 就业: 0, 考研: 0 }; // 初始化毕业意向统计对象

      // 遍历数据，跳过前两行标题和说明
      for (let i = 2; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length < 10 || !row[5] || !row[6]) {
          console.warn(`无效行数据 (第 ${i + 1} 行):`, row);
          continue;
        }

        let major = row[5].trim(); // 专业
        let year = row[6].replace('级', '').trim(); // 年级
        // 使用正则表达式提取年级数字部分
        const match = year.match(/\d+/); // 匹配数字部分
        if (match) {
          year = match[0]; // 获取匹配的数字部分
        }

        if (!result[major]) {
          result[major] = { '2021': 0, '2022': 0, '2023': 0, '2024': 0 };
        }

        if (result[major][year] !== undefined) {
          result[major][year] += 1;
        } else {
          console.warn(`无效年级数据 (第 ${i + 1} 行):`, year);
        }

        // 统计毕业意向
        const graduationIntention = row[9]?.trim(); // 假设毕业意向在第9列
        if (graduationIntention && byqx.hasOwnProperty(graduationIntention)) {
          byqx[graduationIntention] += 1;
        }
      }

      // 将毕业意向转换为指定格式
      const byqxFormatted = Object.keys(byqx).map(key => ({
        value: byqx[key],
        name: key
      }));

      // 更新毕业意向数据
      this.byqx.source = byqxFormatted;

      // 转换为目标格式
      const formattedData = [['zy', '2021', '2022', '2023', '2024']];
      Object.keys(result).forEach((major) => {
        const row = [
          major,
          result[major]['2021'] || 0,
          result[major]['2022'] || 0,
          result[major]['2023'] || 0,
          result[major]['2024'] || 0,
        ];
        formattedData.push(row);
      });

      // 使用 push 或直接修改数组内容
      this.studentData.source.length = 0;  // 清空数组内容
      this.studentData.source.push(...formattedData);  // 将新的数据推送到数组中

      console.log("专业年级分布 ", this.studentData.source);
      console.log("毕业意向统计 ", this.byqx.source);
    },
  },
});
