<template>
  <div ref="chart" style="width: 85%; height: 500px;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl'; // 引入 ECharts GL 来支持 3D 图表

const studentData = ref([
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 },
  { name: 'David', score: 90 },
  { name: 'Eve', score: 76 }
]);

const chart = ref(null); // 使用 ref 来引用 chart DOM 元素

onMounted(() => {
  initChart(); // 在组件挂载时初始化图表
});

const initChart = () => {
  const myChart = echarts.init(chart.value); // 初始化图表实例

  const option = {
    title: {
      text: '学生积分 3D 饼状图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '积分',
        type: 'pie3D', // 使用 3D 饼状图类型
        radius: [30, 70],
        data: studentData.value.map(item => ({ value: item.score, name: item.name })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    ]
  };

  myChart.setOption(option);

  // 窗口大小调整时，重新调整图表大小
  window.addEventListener('resize', myChart.resize);

  // 使 chart 具有响应能力
  chart.value = myChart;
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', chart.value.resize); // 组件销毁前移除事件监听器
});
</script>

<style scoped>
/* 可以根据需要调整样式 */
</style>
