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
            text: '参与人数',

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
              ['xAxis', 'yAxis'],
              [100, '总人数'],
              [80, '男生'],
              [20, '女生']
            ]
          },
          xAxis: {
            name: 'xAxis'
          },
          yAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: false // 刻度与标签对齐
            },
            axisLabel: {
              fontSize: 12, // 调整字体大小
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                x: 'xAxis',
                y: 'yAxis'
              }
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
