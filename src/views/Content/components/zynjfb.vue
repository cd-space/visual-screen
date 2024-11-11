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
            textStyle: {
              color: "rgba(255, 255, 255, 1)"
            }

          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
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
            dimensions: ['xAxis', 'A', 'B', 'C', 'D'],
            source: [
              ['2021', 20, 40, 60, 80],
              ['2022', 10, 30, 50, 70],
              ['2023', 10, 20, 30, 40],
              ['2024', 20, 50, 70, 90],
            ],
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            show: false, // 隐藏 y 轴
          },
          series: [
            {
              type: 'bar',
              itemStyle: {
                color: '#004abf',
              },
              label: {
                show: true,
                position: 'top', // 标签显示在条形图的顶部

                fontSize: 12, // 设置字体大小
              },
            },
            {
              type: 'bar',
              itemStyle: {
                color: '#54edd2',
              },
              label: {
                show: true,
                position: 'top', // 标签显示在条形图的顶部

                fontSize: 12, // 设置字体大小
              },
            },
            {
              type: 'bar',
              itemStyle: {
                color: '#56e8bd',
              },
              label: {
                show: true,
                position: 'top', // 标签显示在条形图的顶部

                fontSize: 12, // 设置字体大小
              },
            },
            {
              type: 'bar',
              itemStyle: {
                color: '#152772',
              },
              label: {
                show: true,
                position: 'top', // 标签显示在条形图的顶部

                fontSize: 12, // 设置字体大小
              },
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
