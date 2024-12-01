<template>
    <div flex="main:center">
        <bv-scroll-table :config="config"></bv-scroll-table>
    </div>
</template>

<script>
import StuList from '/src/stores/StuList.js'

const slist=StuList();
console.log(slist)


// 第一个 <script> 标签：负责处理 Excel 文件读取和数据处理
import { onMounted, reactive } from 'vue';
import * as XLSX from 'xlsx';

const list = []; 
// 在组件挂载时读取 Excel 文件
onMounted(async () => {
    const filePath = '/学生第二期.xlsx';
    try {
        const data = await readExcel(filePath);
        list.push(...data); 
    } catch (error) {
        console.error('Error reading the Excel file:', error);
    }
});
console.log(list)
// function to read Excel
function readExcel(filePath) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filePath);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = new Uint8Array(xhr.response);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0]; // 获取第一个工作表
                const sheet = workbook.Sheets[sheetName];

                // 直接从第三行开始读取数据
                const json = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 2 }); // 设置 range: 2 来跳过前两行

                console.log('Raw data from Excel:', json); // 打印调试信息

                // 假设每一行的数据结构为 [姓名, 年级, 专业]
                const filteredData = json.map(row => [row[2], row[6], row[5]]);
                resolve(filteredData);
            } else {
                reject(new Error('Failed to load the file'));
            }
        };
        xhr.send();
    });
}
</script>

<script setup>
// 第二个 <script> 标签：负责定义配置并绑定数据
import { reactive } from 'vue';

// 配置项
const config = reactive({
    header: ['姓名', '年级', '专业'],
    data: list, // 使用响应式的 list 作为数据源
    index: true,
    columnWidth: [50],
    align: ['center'],
    indexHeader: "序号"
});
</script>

<style scoped></style>
