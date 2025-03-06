import { defineStore } from 'pinia';
import * as XLSX from 'xlsx';

export const useChartDataStore = defineStore('chartData', {
  state: () => ({
    studentData: {
      source: [
        ['zy', '21', '22', '23', '24'],
        [] // 初始为空，后面根据专业和年级填充数据
      ],
    },
    byqx: {
      source: [
        { value: 0, name: '就业' },
        { value: 0, name: '考研' },    
        { value: 0, name: '考公' },    
      ]
    }
  }),
  actions: {
    async loadStudentData() {
      try {
        const response = await fetch('千名学子进百企(积分排行榜).xlsx');
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

        console.log("JSON 数据:", jsonData);

        // 更新 `studentData`
        this.updateStudentData(jsonData);

      } catch (error) {
        console.error("加载 Excel 文件失败：", error);
      }
    },

    updateStudentData(data) {
      const result = {};
      const byqx = { 就业: 0, 考研: 0, 考公: 0 }; // 初始化毕业意向统计对象

      // 遍历数据，跳过标题行
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length < 9) {
          console.warn(`无效行数据 (第 ${i + 1} 行):`, row);
          continue;
        }

        let major = row[4].trim(); // 专业
        let year = row[7].trim(); // 年级

        if (!result[major]) {
          result[major] = { '21': 0, '22': 0, '23': 0, '24': 0 };
        }

        if (result[major][year]) {
          result[major][year] += 1;
        } else if (['21', '22', '23', '24'].includes(year)) {
          result[major][year] = 1;
        } else {
          console.warn(`无效年级数据 `);
        }

        // 统计毕业意向
        const graduationIntention = row[8]?.trim(); // 假设毕业意向在第8列
        if (graduationIntention && (graduationIntention === '就业' || graduationIntention === '考研' || graduationIntention === '考公')) {
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
      const formattedData = [['zy', '21', '22', '23', '24']];
      Object.keys(result).forEach((major) => {
        const row = [
          major,
          result[major]['21'] || 0,
          result[major]['22'] || 0,
          result[major]['23'] || 0,
          result[major]['24'] || 0,
        ];
        formattedData.push(row);
      });

      // 使用 push 或直接修改数组内容
      this.studentData.source.length = 0;  // 清空数组内容
      this.studentData.source.push(...formattedData);  // 将新的数据推送到数组中
    },
  },
});