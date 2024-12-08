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
    let timer = null;

    // 初始化图表
    const initChart = () => {
      if (chart.value) {
        myChart = echarts.init(chart.value);

        const option = {
          title: {
            text: '专业及年级分布',
            left: 10,
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
            },
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
            top: 20,
            data: ['2021', '2022', '2023', '2024'],
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
            },
          },
          grid: {

            height: 120,
            bottom: 30,

          },
          dataset: {
            dimensions: ['专业', '2021', '2022', '2023', '2024'],
            source: [
              ['专业1', 100, 120, 140, 160],
              ['专业2', 90, 110, 130, 150],
              ['专业3', 80, 100, 120, 140],
              ['专业4', 70, 90, 110, 130],
              ['专业5', 60, 80, 100, 120],
              ['专业6', 50, 70, 90, 110],
              ['专业7', 40, 60, 80, 100],
              ['专业8', 30, 50, 70, 90],
              ['专业9', 20, 40, 60, 80],
              ['专业10', 10, 30, 50, 70],
              ['专业11', 15, 25, 35, 45],
              ['专业12', 25, 35, 45, 55],
            ],
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,

            },
          },
          yAxis: {
            type: 'value',
          },
          dataZoom: [
            {
              type: 'slider',
              show: false, // 隐藏滑动条，只使用 API 控制
              xAxisIndex: 0,
              start: 0,
              end: 20, // 初始可见范围
            },
          ],
          series: [
            { type: 'bar', name: '2021', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#004abf' } },
            { type: 'bar', name: '2022', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#54edd2' } },
            { type: 'bar', name: '2023', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#56e8bd' } },
            { type: 'bar', name: '2024', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#152772' } },
          ],
        };

        myChart.setOption(option);

        // 启动自动水平滑动
        startAutoScroll();
      }
    };

    const startAutoScroll = () => {
      let start = 0;
      const step = 10; // 每次滑动的百分比
      const visibleModules = 30; // 可见范围（覆盖 3 个模块的百分比）
      const total = 100;

      timer = setInterval(() => {
        start = (start + step) % total;
        const end = start + visibleModules;

        myChart.dispatchAction({
          type: 'dataZoom',
          dataZoomIndex: 0,
          start: start,
          end: end > total ? total : end,
        });
      }, 1000); // 每1秒更新一次
    };

    const resizeChart = () => {
      if (myChart) {
        myChart.resize();
      }
    };

    onMounted(() => {
      initChart();
      window.addEventListener('resize', resizeChart);
    });

    onBeforeUnmount(() => {
      if (myChart) {
        myChart.dispose();
      }
      clearInterval(timer); // 清除定时器
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
