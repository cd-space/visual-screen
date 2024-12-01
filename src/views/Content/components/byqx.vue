<template>
  <div class="byqx">毕业去向</div>
  <!-- 设置一个 div 来承载 ECharts 图表，指定宽高 -->
  <div ref="chart" style="width: 100%; height: 200px;"></div>
</template>

<script>
import * as echarts from 'echarts'; // 导入 echarts 库
import 'echarts-gl'; // 导入 echarts-gl 扩展模块
import { getPie3D, getParametricEquation } from '@/utils/chart.js'; // 引入自定义工具方法

const color = ['#2bdcb5', '#023c8d']; // 定义颜色数组，用于不同部分的图形显示

export default {
  name: 'Chart3D', // 定义组件名称
  data() {
    return {
      // 初始化图表的数据
      optionData: [
        { value: 176, name: '考研' },
        { value: 288, name: '就业' }
      ],
      statusChart: null, // 用来存储图表实例
      option: {} // 图表配置
    };
  },
  created() {
    this.setLabel(); // 组件创建时设置图表标签样式
  },
  mounted() {
    this.initChart(); // 组件挂载后初始化图表

    window.addEventListener('resize', this.changeSize); // 监听窗口大小变化，调整图表大小
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.changeSize); // 移除监听器
    if (this.statusChart) {
      this.statusChart.dispose(); // 组件销毁时销毁图表实例
    }
  },
  methods: {
    // 设置图表数据标签样式
    setLabel() {
      this.optionData.forEach((item, index) => {
        item.itemStyle = { color: color[index] }; // 设置每项的颜色
        item.label = {
          show: true, // 显示标签
          color: color[index], // 标签颜色
          formatter: ['{b|{b}}', '{c|{c}}{b|人}', '{d|{d}%}'].join('\n'), // 标签显示格式
          rich: { // 设置不同部分的样式
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
        };
        item.labelLine = {
          lineStyle: { width: 1, color: 'rgba(255,255,255,0.7)' } // 标签连接线样式
        };
      });
    },
    // 初始化图表
    initChart() {
      this.statusChart = echarts.init(this.$refs.chart); // 初始化图表实例
      this.option = getPie3D(this.optionData, 0.8, 240, 28, 26, 0.5); // 获取 3D 饼图配置
      this.statusChart.setOption(this.option); // 设置图表配置

      // 添加一个透明的饼图，用于交互
      this.option.series.push({
        name: '毕业去向',
        type: 'pie',
        label: { opacity: 1, fontSize: 13, lineHeight: 20 },
        startAngle: -40, // 起始角度
        clockwise: false, // 逆时针方向
        radius: ['20%', '50%'], // 半径范围
        center: ['50%', '50%'], // 中心位置
        data: this.optionData, // 数据
        itemStyle: { opacity: 0 } // 透明度设置为 0
      });
      this.statusChart.setOption(this.option); // 更新图表配置

      this.bindListen(this.statusChart); // 绑定事件监听
    },
    // 绑定点击和鼠标悬停事件
    bindListen(myChart, optionName = 'option') {
      let selectedIndex = ''; // 选中的图表序列索引
      let hoveredIndex = ''; // 当前鼠标悬停的图表序列索引

      // 点击事件，切换选中状态
      myChart.on('click', (params) => {
        const isSelected = !this[optionName].series[params.seriesIndex].pieStatus.selected; // 获取是否选中
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
          this[optionName].series[selectedIndex].pieStatus.selected = false; // 取消选中状态
        }

        // 更新选中状态
        this[optionName].series[params.seriesIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          false,
          k,
          this[optionName].series[params.seriesIndex].pieData.value
        );
        this[optionName].series[params.seriesIndex].pieStatus.selected = isSelected; // 更新当前选中状态
        selectedIndex = isSelected ? params.seriesIndex : null; // 设置当前选中的索引
        myChart.setOption(this[optionName]); // 更新图表
      });

      // 鼠标悬停事件
      myChart.on('mouseover', (params) => {
        if (hoveredIndex === params.seriesIndex) return; // 如果鼠标悬停的已经是当前项则不做操作
        if (hoveredIndex !== '') {
          this.updateHoverEffect(hoveredIndex, false, optionName); // 取消先前悬停的效果
          hoveredIndex = '';
        }
        if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
          this.updateHoverEffect(params.seriesIndex, true, optionName, 60); // 更新悬停效果
          hoveredIndex = params.seriesIndex; // 设置当前悬停的索引
        }
        myChart.setOption(this[optionName]); // 更新图表
      });

      // 鼠标移出事件
      myChart.on('globalout', () => {
        if (hoveredIndex !== '') {
          this.updateHoverEffect(hoveredIndex, false, optionName); // 取消悬停效果
          hoveredIndex = '';
        }
        myChart.setOption(this[optionName]); // 更新图表
      });
    },
    // 更新悬停效果
    updateHoverEffect(index, isHovered, optionName, hoverValue = 0) {
      const series = this[optionName].series[index]; // 获取对应的系列
      const { startRatio, endRatio, value } = series.pieData; // 获取饼图数据
      const { selected, k } = series.pieStatus; // 获取饼图状态
      series.parametricEquation = getParametricEquation(
        startRatio, endRatio, selected, isHovered, k, value + hoverValue
      ); // 更新参数方程
      series.pieStatus.hovered = isHovered; // 更新悬停状态
    },
    // 改变图表大小
    changeSize() {
      this.statusChart.resize(); // 调整图表大小
    }
  }
};
</script>

<style scoped>
.byqx {
  float: left;
  font-size: larger;
  color: rgb(255, 255, 255);
}
</style>
