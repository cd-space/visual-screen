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
    console.log("vue测试", chartDataStore.studentData);
    // 初始化图表
    const initChart = () => {
      if (chart.value) {
        myChart = echarts.init(chart.value);

        // 从store中获取处理后的数据
        // console.log("vue测试数据", ZYData);
        //console.log("vue测试数据1", zyStore.studentData);

        const option = {

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
          dataset: chartDataStore.studentData,
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
  font-weight: bolder;
  color: rgb(255, 255, 255);
  margin-left: 5%;
}
</style>
