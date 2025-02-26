<template>
  <div class="levelSrcoll">
    <vue3-seamless-scroll
      :data="dataRes"
      :class-option="classOption"
      @mousewheel="handleScroll"
      ref="vueSeamlessScroll"
      id="div"
    >
      <ul class="tbody" v-for="(item, i) in dataRes" :key="i">
        <li class="lineFeed center" style="width: 14%">{{ item.irank }}</li>
        <li class="lineFeed schoolName" style="width: 29%" :title="item.dataName">{{ item.dataName }}</li>
        <li class="lineFeed" style="width: 19%">{{ item.totalCount }}</li>
        <li class="lineFeed" style="width: 19%">{{ item.dataCount }}</li>
        <li class="lineFeed" style="width: 19%">{{ getPercent(item.percent) }}%</li>
      </ul>
    </vue3-seamless-scroll>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { Vue3SeamlessScroll, VerticalScroll, HorizontalScroll } from "vue3-seamless-scroll";

const dataRes = ref([
  { irank: 1, dataName: '学校A', totalCount: 1000, dataCount: 800, percent: 0.8 },
  { irank: 2, dataName: '学校B', totalCount: 900, dataCount: 700, percent: 0.77 },
  { irank: 3, dataName: '学校C', totalCount: 1200, dataCount: 1000, percent: 0.83 },
  { irank: 4, dataName: '学校D', totalCount: 1100, dataCount: 900, percent: 0.82 },
  { irank: 5, dataName: '学校E', totalCount: 950, dataCount: 750, percent: 0.79 },
  { irank: 6, dataName: '学校F', totalCount: 800, dataCount: 600, percent: 0.75 },
  { irank: 7, dataName: '学校G', totalCount: 700, dataCount: 500, percent: 0.71 },
  { irank: 8, dataName: '学校H', totalCount: 600, dataCount: 400, percent: 0.67 },
  { irank: 9, dataName: '学校I', totalCount: 500, dataCount: 300, percent: 0.6 },
  { irank: 10, dataName: '学校J', totalCount: 400, dataCount: 200, percent: 0.5 },
  { irank: 11, dataName: '学校K', totalCount: 300, dataCount: 100, percent: 0.33 },
  { irank: 12, dataName: '学校L', totalCount: 200, dataCount: 50, percent: 0.25 },
  { irank: 13, dataName: '学校M', totalCount: 100, dataCount: 20, percent: 0.2 },
  { irank: 14, dataName: '学校N', totalCount: 50, dataCount: 10, percent: 0.2 },
  { irank: 15, dataName: '学校O', totalCount: 20, dataCount: 5, percent: 0.25 },
  { irank: 16, dataName: '学校P', totalCount: 10, dataCount: 2, percent: 0.2 },
  { irank: 17, dataName: '学校Q', totalCount: 5, dataCount: 1, percent: 0.2 },
  { irank: 18, dataName: '学校R', totalCount: 2, dataCount: 1, percent: 0.5 },
  { irank: 19, dataName: '学校S', totalCount: 1, dataCount: 1, percent: 1 },
]);

const classOption = computed(() => ({
  step: 0.6,
  limitMoveNum: 3,
  hoverStop: true,
  direction: 1,
  openWatch: true,
}));

const handleScroll = (e) => {
  const scrollRef = $refs.vueSeamlessScroll;
  scrollRef.yPos = scrollRef.yPos - e.deltaY;

  if (scrollRef.yPos > 0) {
    scrollRef.yPos = 0;
    return;
  }

  if (Math.abs(scrollRef.yPos) > document.getElementById('div').offsetHeight / 2 - 180) {
    scrollRef.yPos = -(document.getElementById('div').offsetHeight / 2 - 180);
  }
};

onMounted(() => {
  nextTick(() => {
    $refs.vueSeamlessScroll.reset();
  });
});

const getPercent = (percent) => {
  return (percent * 100).toFixed(2);
};
</script>

<style scoped>
.levelSrcoll {
  height: 300px; /* 设置组件的高度 */
  overflow: hidden; /* 隐藏溢出内容 */
  border: 1px solid #ccc; /* 边框 */
}

.tbody {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lineFeed {
  display: inline-block;
  padding: 10px 0;
  text-align: center;
}

.center {
  text-align: center;
}

.schoolName {
  word-wrap: break-word;
  white-space: nowrap;
}

.lineFeed:not(:last-child) {
  border-right: 1px solid #ddd; /* 给每一列添加分隔线 */
}
</style>
