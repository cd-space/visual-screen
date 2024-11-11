<template>
  <div id="chart-panel" class="chart-panel"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'DonutChart',
  mounted() {
    this.createDonutChart();
  },
  methods: {
    createDonutChart() {
      // 数据定义
      const salesData = [
        { label: 'Basic', color: '#2f7ed8' },
        { label: 'Plus', color: '#0d233a' },
        { label: 'Lite', color: '#8bbc21' },
        { label: 'Elite', color: '#910000' },
        { label: 'Delux', color: '#1aadce' }
      ];

      // 容器尺寸
      const width = 400, height = 500;

      // 创建SVG画布
      const svg = d3.select('#chart-panel').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g').attr('id', 'circleDonut');

      // 调用Donut3D绘图函数
      this.drawDonut3D(svg, this.randomData(salesData), 150, 150, 130, 100, 30, 0);
    },

    randomData(salesData) {
      // 生成随机数据
      return salesData.map(d => ({
        label: d.label,
        value: 1000 * Math.random(),
        color: d.color
      }));
    },

    drawDonut3D(svg, data, cx, cy, r1, r0, h, a) {
      // 确保Donut3D函数已经定义或引入
      if (typeof Donut3D !== 'undefined') {
        Donut3D.draw('circleDonut', data, cx, cy, r1, r0, h, a);
      } else {
        console.error('Donut3D is not loaded');
      }
    }
  }
};
</script>

<style scoped>
.chart-panel {
  /* 自定义样式，确保容器有合适的大小 */
  width: 100%;
  height: 100%;
}
</style>
