<template>
  <div class="byqx">专业及年级分布</div>
  <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useChartDataStore } from '@/stores/zynjfb.js';
export default {
  name: 'BarChart',
  setup() {
    const chart = ref(null);
    let myChart = null;
    let timer = null;
    // 获取Pinia store中的数据
    const chartDataStore = useChartDataStore();

    // 初始化图表
    const initChart = () => {
      if (chart.value) {
        myChart = echarts.init(chart.value);

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            type: 'scroll',
            orient: 'horizontal',
            itemWidth: 10,
            right: 0,
            top: 0,
            data: ['21', '22', '23', '24'],
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
            },
            width: 100
          },
          grid: {
            height: 100,
            bottom: 30,
            left: 35,
            
          },
          dataset: chartDataStore.studentData,
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0, // 每个标签都显示
              color: '#ffffff', // 标签颜色
              // 格式化 x 轴标签，只显示前 4 个字
              formatter: function (value) {
                return value.slice(0, 4);
              }
            },
            axisLine: {
              show: false, // 隐藏 y 轴轴线
            },
            minorSplitLine: {
              show: false, // 隐藏辅助线
            },
            axisTick: {
              show: false, // 隐藏 y 轴的数据刻度线
            },
            splitLine: {
              show: false, // 显示网格线（刻度线之间的线条）
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)', // 设置网格线的颜色和透明度
              },
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              interval: 0, // 每个标签都显示
              color: '#ffffff', // 标签颜色
            },
            axisLine: {
              show: false, // 隐藏 y 轴轴线
            },
            minorSplitLine: {
              show: false, // 隐藏辅助线
            },
            axisTick: {
              show: false, // 隐藏 y 轴的数据刻度线
            },
            splitLine: {
              show: true, // 显示网格线（刻度线之间的线条）
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)', // 设置网格线的颜色和透明度
              },
            },
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
            { type: 'bar', name: '21', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#F9E4A0' } },
            { type: 'bar', name: '22', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#86C7CC' } },
            { type: 'bar', name: '23', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#56e8bd' } },
            { type: 'bar', name: '24', barWidth: 10, barCategoryGap: 10, stack: null, itemStyle: { color: '#E3EAE1' } },
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
      const visibleModules = 20; // 可见范围（覆盖 3 个模块的百分比）
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
    onBeforeUnmount(() => {
      if (myChart) {
        myChart.dispose();
      }
      clearInterval(timer); // 清除定时器
      window.removeEventListener('resize', resizeChart);
    });

    onMounted(async () => {
      await chartDataStore.loadStudentData();
      initChart();
      window.addEventListener('resize', resizeChart);
    });

    return {
      chart,
    };
  },
};
</script>

<style scoped>
.byqx {
  float: left;
  font-size: larger;
  margin-left: 5%;
  color: #eee;
}
</style>