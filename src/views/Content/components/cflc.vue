<template>
  <div ref="chart" style="width: 100%; height: 200px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'SmoothLineChart',
  setup() {
    const chart = ref(null);
    let myChart = null;
    let timer = null;

    const initChart = () => {
      if (chart.value) {
        // 初始化图表
        myChart = echarts.init(chart.value);

        // 配置图表选项
        const option = {
          title: {
            text: '参访里程',
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
            },
          },
          tooltip: {
            trigger: 'axis', // 鼠标悬停显示提示
          },
          dataset: {
            source: [
              ['月份', '参访里程'],
              ['1月', 30],
              ['2月', 50],
              ['3月', 70],
              ['4月', 90],
              ['5月', 120],
              ['6月', 150],
              ['7月', 170],
              ['8月', 190],
              ['9月', 210],
              ['10月', 230],
              ['11月', 250],
              ['12月', 270],
            ],
          },
          grid: {
            height: 120,
            bottom: 30,
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0, // 每个标签都显示
              color: '#ffffff', // 标签颜色
            },
            axisLine: {
              lineStyle: { color: '#ffffff' },
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff', // 标签颜色
            },
            axisLine: {
              lineStyle: { color: '#ffffff' },
            },
          },
          series: [
            {
              type: 'line',
              smooth: true, // 平滑曲线
              encode: {
                x: '月份',
                y: '参访里程',
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#27626d' },
                  { offset: 1, color: '#03051a' },
                ]),
              },
              itemStyle: {
                color: '#73C9E6', // 折线点颜色
              },
            },
          ],
          dataZoom: [
            {
              type: 'slider',
              show: false, // 不显示滑块
              xAxisIndex: 0,
              start: 0, // 初始起点
              end: 25, // 初始终点
            },
          ],
          animationEasing: 'cubicOut',
          animationEasingUpdate: 'cubicOut', // 平滑动画
          animationDurationUpdate: 200, // 动画更新时长
        };

        // 设置图表选项
        myChart.setOption(option);

        // 启动滚动效果
        startAutoScroll();
      }
    };

    const startAutoScroll = () => {
      let start = 0;
      let end = 25;
      const step = 0.2; // 每次移动的范围比例
      const interval = 50; // 动画间隔 (ms)

      timer = setInterval(() => {
        start += step;
        end += step;

        if (end > 100) {
          start = 0;
          end = 25; // 重置滚动范围
        }

        // 更新图表数据范围
        myChart.setOption({
          dataZoom: [
            {
              start,
              end,
            },
          ],
        });
      }, interval);
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
        myChart.dispose(); // 销毁图表实例
      }
      if (timer) {
        clearInterval(timer); // 清除定时器
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
/* 样式自定义 */
</style>
