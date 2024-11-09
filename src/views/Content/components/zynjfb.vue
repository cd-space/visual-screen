<template>
  <div ref="chart" style="width: 100%; height: 200px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'BarChart',
  setup() {
    const chart = ref(null);
    let myChart = null;

    // 初始化图表
    const initChart = () => {
      if (chart.value) {
        myChart = echarts.init(chart.value);
        const option = {
          title: {
            text: '专业及年级分布',

          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            orient: 'horizontal',
            right: 20,
            top: 10,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            scroll: true,
          },
          dataset: {
            source: [
              ['xAxis', 'A', 'B', 'C', 'D'],
              ['2021', 20, 40, 60, 80],
              ['2022', 10, 30, 50, 70],
              ['2023', 10, 20, 30, 40],
              ['2024', 20, 50, 70, 90]
            ]
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {

          },
          series: [
            {
              type: 'bar',
            },
            {
              type: 'bar',
            },
            {
              type: 'bar',
            }
          ],
        };
        myChart.setOption(option);
      }
    };

    onMounted(() => {
      initChart();
      window.addEventListener('resize', resizeChart);
    });

    const resizeChart = () => {
      if (myChart) {
        myChart.resize();
      }
    };

    onBeforeUnmount(() => {
      if (myChart) {
        myChart.dispose();
      }
      window.removeEventListener('resize', resizeChart);
    });

    return {
      chart,
    };
  },
};
</script>

<style scoped>
/* 可以根据需要调整图表容器的样式 */
</style>
