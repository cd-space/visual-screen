<template>
  <div class="byqx">参与人数</div>
  <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref, toRaw } from 'vue';
import { useCYRSStore } from '@/stores/cyrs.js'; // 引入 Pinia Store

export default {
  name: 'BarChart',
  setup() {
    const chart = ref(null); // 响应式引用图表容器
    let myChart = null; // 存储 ECharts 实例
    const store = useCYRSStore();
    const rawData = toRaw(store.CYRSData);

    const initChart = () => {
      if (chart.value) {
        myChart = echarts.init(chart.value);

        const option = {

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow', // 阴影指示器
            },
          },
          grid: {
            left: 45,
            right: 30,
            height: "70%",
            bottom: 30,


          },

          xAxis: {
            type: 'category', // 将 x 轴设置为类目轴
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: '#FFFFFF', // 白色标签
            },
            axisTick: {
              show: false, // 隐藏 y 轴的数据刻度线
            },
          },
          yAxis: {
            type: 'value', // 将 y 轴设置为数值轴
            axisLine: {
              show: false, // 隐藏 y 轴轴线
            },
            minorSplitLine: {
              show: false, // 隐藏辅助线
            },
            axisLabel: {
              color: '#FFFFFF', // 白色标签
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
          dataset: rawData, // 使用 Pinia 数据源
          series: [
            {
              type: 'bar',
              encode: {
                x: 'category', // 对应 x 轴的字段
                y: 'value',    // 对应 y 轴的字段
              },
              barWidth: '40%', // 调整柱条宽度
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#00348b' },
                  { offset: 1, color: '#34fdbd' },
                ]),
              },
              label: {
                show: true,
                position: 'top', // 在柱条顶部显示值
                formatter: (params) => {
                  return `${params.value[1]}`; // 仅显示数字部分
                },
                fontSize: 12,
                color: '#FFFFFF', // 字体颜色
              },
            },
          ],
        };

        myChart.setOption(option);
      }
    };

    onMounted(async () => {
      await store.loadStudentData(); // 加载数据
      initChart();
      window.addEventListener('resize', resizeChart); // 响应窗口大小调整
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
.byqx {
  float: left;
  font-size: larger;
  margin-left: 5%;
  color: #eee;
}
</style>