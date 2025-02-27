<template>
  <div>
    <div class="title">累计数量</div>
    <div ref="chart" style="width: 100%; height: 200px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { useCYRSStore } from '@/stores/cyrs.js';

const chart = ref(null);
let myChart = null;
const excelStore = useCYRSStore();

const initChart = (value) => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    const option = {
      title: {
        text: `${value}个`, // 显示数值
        textStyle: {
          fontSize: 20,
          fontFamily: 'Microsoft Yahei',
          fontWeight: 'normal',
          color: '#fff',
        },
        x: 'center',
        y: '38%',
      },
      series: [
        {
          type: 'liquidFill',
          radius: '75%',
          center: ['50%', '50%'],
          data: [0.4, 0.4], // 固定填充高度为 40%
          label: {
            show: false, // 隐藏显示在水球图上的数值文本 
          },
          backgroundStyle: {
            color: 'transparent',
          },
          outline: {
            borderDistance: 3,
            itemStyle: {
              borderWidth: 4,
              borderColor: '#5acef2',
            },
          },
          color: [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 1, color: 'rgba(6, 187, 112, 0.3)' },
                { offset: 0, color: 'rgba(11, 201, 199, 0.3)' },
              ],
            },
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 1, color: 'rgba(6, 187, 112, 1)' },
                { offset: 0, color: 'rgba(11, 201, 199, 1)' },
              ],
            },
          ],
        },
      ],
    };
    myChart.setOption(option);
  }
};

const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};

onMounted(async () => {
<<<<<<< HEAD
  await excelStore.loadStudentData();
  const enterpriseCount = excelStore.LJSL[0];
  initChart(enterpriseCount); // 初始化图表
=======
  await excelStore.loadAndSumDistance('src/assets/参访企业.xlsx');
  const totalDistance = excelStore.totalDistance;
  console.log(excelStore.totalDistance);
  initChart(totalDistance); // 初始化图表
>>>>>>> refs/remotes/origin/main
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
  window.removeEventListener('resize', resizeChart);
});
</script>

<style scoped>
.title {
  float: left;
  font-size: larger;
  font-weight: bolder;
  color: rgb(255, 255, 255);
  margin-left: 5%;
}
</style>