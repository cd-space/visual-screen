<!--看好了，我只演示一遍-->
<template>
  <div ref="chart" style="width: 100%; height: 200px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref } from 'vue';//用于管理响应式数据和组件生命周期

export default {
  name: 'BarChart',//定义一个名为 BarChart 的 Vue 组件，并开始 setup 函数
  setup() {
    const chart = ref(null);//创建一个响应式引用 chart，存储图表容器元素。
    let myChart = null;//声明一个变量 myChart 用于存储 ECharts 实例。

    // 定义 initChart 函数，用于初始化图表。
    const initChart = () => {
      //检查 chart 引用是否已绑定到 DOM 元素。
      if (chart.value) {
        myChart = echarts.init(chart.value);//使用 echarts.init() 创建一个 ECharts 实例并绑定到图表容器。

        const option = {
          //设置标题
          title: {
            text: '参与人数',
            textStyle: {
              color: "rgba(255, 255, 255, 1)"
            }
          },
          //配置工具提示，在鼠标悬停时触发
          tooltip: {
            trigger: 'axis',
            //设置为 shadow 以显示阴影效果。
            axisPointer: {
              type: 'shadow',
            },
          },
          //设置图表的内边距，确保标签不会超出图表边界。
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            containLabel: true,
          },
          // 隐藏 x 轴，不显示坐标轴的刻度、标签和线条。
          xAxis: {
            show: false, // 隐藏 x 轴
          },
          //设置 y 轴类型为 category 类目轴。
          yAxis: {
            type: 'category',
            data: ['总人数', '男生', '女生'], // y 轴数据
            axisLine: {
              show: false, // 隐藏 y 轴轴线
            },
            axisTick: {
              show: false, // 隐藏 y 轴刻度
            },
            axisLabel: {
              show: false, // 隐藏 y 轴标签
            },
          },
          series: [
            {
              type: 'bar',
              data: [100, 80, 20],
              barWidth: '40%',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#00348b' },
                  { offset: 1, color: '#34fdbd' },
                ]),
              },
              label: {
                show: true,
                position: 'top', // 显示在条形图上方
                formatter: (params) => {
                  const icon = params.dataIndex === 1 ? '👦' : '👧';
                  const labelNames = ['总人数', '男生', '女生'];
                  return `${icon} ${labelNames[params.dataIndex]}：${params.value}人`;
                },
                fontSize: 12,
              },
            },
          ],

        };

        myChart.setOption(option);
      }
    };

    onMounted(() => {
      initChart();
      window.addEventListener('resize', resizeChart);//监听窗口大小变化
    });

    const resizeChart = () => {
      if (myChart) {
        myChart.resize();//监听窗口大小变化
      }
    };

    onBeforeUnmount(() => {
      if (myChart) {
        myChart.dispose();//销毁图表实例，释放内存。
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
