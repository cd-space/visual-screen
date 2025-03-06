<template>
  <div class="byqx">参访里程</div>
  <div ref="chart" style="width: 100%; height:100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref, toRaw } from 'vue';//用于管理响应式数据和组件生命周期
import { useCYRSStore } from '@/stores/cyrs.js'; // 引入 Pinia Store

export default {
  name: 'SmoothLineChart',
  setup() {
    const chart = ref(null);
    let myChart = null;
    let timer = null;
    const store = useCYRSStore();
    const rawData = toRaw(store.CFLCData);

    const initChart = () => {
      if (chart.value) {
        // 初始化图表
        myChart = echarts.init(chart.value);

        const option = {

          tooltip: {
            trigger: 'axis', // 鼠标悬停显示提示
          },
          dataset: rawData,
          grid: {
            height: 100,
            bottom: 30,
            left: 35,
            right: 20,
          },
          xAxis: {
            type: 'category',
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


    onMounted(async () => {
      await store.loadStudentData(); // 等待数据加载完成
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
.byqx {
  float: left;
  font-size: larger;
  margin-left: 5%;
  color: #eee;
}
</style>
