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
    const initChart = async () => {
      if (chart.value) {
        const response = await fetch('/path/to/data.json'); // 请根据实际路径替换
        const jsonData = await response.json();

        myChart = echarts.init(chart.value);
        const option = {
          title: {
            text: '参访里程',
            textStyle: {
              color: "rgba(255, 255, 255, 1)"
            }
          },
          tooltip: {},
          dataset: {
            source: jsonData.source  // 直接使用 source 数据
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'line',
              encode: { x: 'month', y: 'distance' },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#27626d' },
                  { offset: 1, color: '#03051a' },
                ]),
              },
              itemStyle: {
                color: '#73C9E6',
              },
              markPoint: {
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                  color: '#73C9E6',
                  shadowBlur: 20,
                  shadowColor: '#73C9E6',
                },
                data: [
                  { type: 'max', name: 'Max Value' },
                  { type: 'min', name: 'Min Value' },
                ],
              },
              animation: true,
              animationEasing: 'linear',
              animationDurationUpdate: 2000,
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
