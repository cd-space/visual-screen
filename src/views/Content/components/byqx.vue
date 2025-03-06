<template>
  <div class="byqx">毕业意向</div>
  <!-- 设置一个 div 来承载 ECharts 图表，指定宽高 -->
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useChartDataStore } from '@/stores/zynjfb.js';

// 定义 chartRef 引用
const chartRef = ref(null);
let myChart = null;
const chartDataStore = useChartDataStore();

onMounted(async () => {
  // 加载学生数据
  await chartDataStore.loadStudentData();

  // 获取毕业意向数据
  const byqxData = chartDataStore.byqx.source;

  // 初始化 ECharts 实例
  myChart = echarts.init(chartRef.value);

  // 配置 ECharts 选项
  const option = {
    // 设置全局调色盘
    color: ['#2ee8b7', '#01368d', '#675bba'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: 0,
      right: 5,
      textStyle: {
        color: 'rgba(255, 255, 255, 1)',
      },
      width: 120
    },
    series: [
      {
        name: '毕业意向',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        // 设置扇区间隙角度
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: true, // 显示标签
          position: 'outside', // 标签位置设置为扇形外部
          color: '#eee',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true, // 显示提示线
          length: 20, // 第一段长度
          length2: 15, // 第二段长度
          smooth: true, // 平滑提示线
          lineStyle: {
            color: '#999', // 提示线颜色
            width: 1, // 线宽
            type: 'solid' // 线条类型为实线
          }
        },
        data: byqxData
      }
    ]
  };

  // 设置 ECharts 选项
  myChart.setOption(option);

  // 监听窗口大小变化，重新调整图表大小
  const resizeHandler = () => {
    if (myChart) {
      myChart.resize();
    }
  };
  window.addEventListener('resize', resizeHandler);

  // 在组件销毁前移除事件监听器
  onBeforeUnmount(() => {
    if (myChart) {
      myChart.dispose();
    }
    window.removeEventListener('resize', resizeHandler);
  });
});
</script>

<style scoped>
.byqx {
  float: left;
  font-size: larger;
  margin-left: 5%;
  color: #eee;


}
</style>