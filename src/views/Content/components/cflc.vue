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
            text: '参访里程',
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [10, 20, 40, 60, 80, 100, 120, 140, 160, 180],
              type: 'line',
              areaStyle: {}
            },
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
