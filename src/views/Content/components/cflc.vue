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
            text: '参访里程',
            textStyle: {
              color: "rgba(255, 255, 255, 1)"
            }
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [10, 20, 40, 60, 80, 100, 120, 140, 160, 180],
              type: 'line',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#27626d' },   // 顶部颜色
                  { offset: 1, color: '#03051a' },  // 底部颜色
                ]),
              },
              itemStyle: {
                color: '#73C9E6',  // 线条颜色
              },
              emphasis: {
                itemStyle: {
                  color: '#73C9E6',
                  shadowBlur: 20,
                  shadowColor: '#73C9E6',
                },
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
              animationDurationUpdate: 2000, // 控制动画速度
            },
          ],
        };
        myChart.setOption(option);

        // 动态左右移动数据点
        let index = 0;
        setInterval(() => {
          index = (index + 1) % option.series[0].data.length;
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: index,
          });
          setTimeout(() => {
            myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: index,
            });
          }, 1000); // 延迟使得发光效果短暂展示
        }, 1500);
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
