<template>
  <div ref="chart" style="width: 100%; height: 200px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import { getPie3D, getParametricEquation } from '@/utils/chart.js';

const color = ['#005aff', '#f8b551'];

export default {
  name: 'Chart3D',
  data() {
    return {
      optionData: [
        { name: '考研', value: 176 },
        { name: '就业', value: 288 }
      ],
      statusChart: null,
      option: {}
    };
  },
  created() {
    this.setLabel();
  },
  mounted() {
    this.initChart();

    window.addEventListener('resize', this.changeSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.changeSize);
    if (this.statusChart) {
      this.statusChart.dispose();
    }
  },
  methods: {
    setLabel() {
      this.optionData.forEach((item, index) => {
        item.itemStyle = { color: color[index] };
        item.label = {
          normal: {
            show: true,
            color: color[index],
            formatter: ['{b|{b}}', '{c|{c}}{b|人}', '{d|{d}%}'].join('\n'),
            rich: {
              b: { color: '#fff', lineHeight: 25, align: 'left' },
              c: {
                fontSize: 22,
                color: '#fff',
                textShadowColor: '#1c90a6',
                textShadowOffsetX: 0,
                textShadowOffsetY: 2,
                textShadowBlur: 5
              },
              d: { color: color[index], align: 'left' }
            }
          }
        };
        item.labelLine = {
          normal: {
            lineStyle: { width: 1, color: 'rgba(255,255,255,0.7)' }
          }
        };
      });
    },
    initChart() {
      this.statusChart = echarts.init(this.$refs.chart);
      this.option = getPie3D(this.optionData, 0.8, 240, 28, 26, 0.5);
      this.statusChart.setOption(this.option);

      this.option.series.push({
        name: '毕业去向',
        type: 'pie',
        label: { opacity: 1, fontSize: 13, lineHeight: 20 },
        startAngle: -40,
        clockwise: false,
        radius: ['20%', '50%'],
        center: ['50%', '50%'],
        data: this.optionData,
        itemStyle: { opacity: 0 }
      });
      this.statusChart.setOption(this.option);

      this.bindListen(this.statusChart);
    },
    bindListen(myChart, optionName = 'option') {
      let selectedIndex = '';
      let hoveredIndex = '';

      myChart.on('click', (params) => {
        const isSelected = !this[optionName].series[params.seriesIndex].pieStatus.selected;
        const k = this[optionName].series[params.seriesIndex].pieStatus.k;
        const startRatio = this[optionName].series[params.seriesIndex].pieData.startRatio;
        const endRatio = this[optionName].series[params.seriesIndex].pieData.endRatio;

        if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
          this[optionName].series[selectedIndex].parametricEquation = getParametricEquation(
            this[optionName].series[selectedIndex].pieData.startRatio,
            this[optionName].series[selectedIndex].pieData.endRatio,
            false,
            false,
            k,
            this[optionName].series[selectedIndex].pieData.value
          );
          this[optionName].series[selectedIndex].pieStatus.selected = false;
        }

        this[optionName].series[params.seriesIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          false,
          k,
          this[optionName].series[params.seriesIndex].pieData.value
        );
        this[optionName].series[params.seriesIndex].pieStatus.selected = isSelected;
        selectedIndex = isSelected ? params.seriesIndex : null;
        myChart.setOption(this[optionName]);
      });

      myChart.on('mouseover', (params) => {
        if (hoveredIndex === params.seriesIndex) return;
        if (hoveredIndex !== '') {
          this.updateHoverEffect(hoveredIndex, false, optionName);
          hoveredIndex = '';
        }
        if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
          this.updateHoverEffect(params.seriesIndex, true, optionName, 60);
          hoveredIndex = params.seriesIndex;
        }
        myChart.setOption(this[optionName]);
      });

      myChart.on('globalout', () => {
        if (hoveredIndex !== '') {
          this.updateHoverEffect(hoveredIndex, false, optionName);
          hoveredIndex = '';
        }
        myChart.setOption(this[optionName]);
      });
    },
    updateHoverEffect(index, isHovered, optionName, hoverValue = 0) {
      const series = this[optionName].series[index];
      const { startRatio, endRatio, value } = series.pieData;
      const { selected, k } = series.pieStatus;
      series.parametricEquation = getParametricEquation(
        startRatio, endRatio, selected, isHovered, k, value + hoverValue
      );
      series.pieStatus.hovered = isHovered;
    },
    changeSize() {
      this.statusChart.resize();
    }
  }
};
</script>

<style scoped>
/* 自定义样式 */
</style>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart,
.bg {
  width: 100%;
  height: 100%;
}

.bg {
  position: absolute;
  bottom: 50px;
  left: 50%;
  z-index: -1;
  width: 180px;
  height: 73px;
  background: no-repeat center;
  background-image: url('https://ks3-cn-beijing.ksyun.com/sxjg-elevator/datav-platform-2.0/images/chart_opacity_bg.png');
  background-size: 100% 100%;
  transform: translateX(-50%);
}
</style>