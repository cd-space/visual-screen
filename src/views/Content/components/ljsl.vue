<template>
  <div class="container">
    <div class="title">累计数量</div>
    <div ref="chart" class="chart"></div>
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

const initChart = (targetValue) => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    let currentValue = 0; // 初始值设为 0

    const option = {
      title: {
        text: `${currentValue}个`, // 初始显示 0
        textStyle: {
          fontSize: 20,
          fontFamily: 'Microsoft Yahei',
          fontWeight: 'normal',
          color: '#fff',
        },
        x: 'center',
        y: '58%',
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

    // 使用定时器逐步增加数值
    const intervalId = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue++;
        option.title.text = `${currentValue}个`;
        myChart.setOption(option);
      } else {
        clearInterval(intervalId); // 达到目标值后清除定时器
      }
    }, 100); // 每 100 毫秒更新一次
  }
};

const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};

onMounted(async () => {
  await excelStore.loadStudentData();
  const enterpriseCount = excelStore.LJSL[0];
  initChart(enterpriseCount); // 初始化图表
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
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  float: left;
  font-size: larger;
  margin-left: 5%;
  color: #eee;
}

.chart {
  width: 80%;
  height: 80%;
  margin: auto;
  /* 使图表在容器中居中 */
}
</style>