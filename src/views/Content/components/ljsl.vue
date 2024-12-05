<template>
  <div class="box">
    <div class="background">
      <div class="Title">{{ title }}</div>
      <div class="Content">{{ content }}km</div>
    </div>
  </div>
</template>

<script setup>
import { ref ,onMounted} from 'vue'
import { useExcelDataStore } from '@/stores/ljsl';
const title = ref('累计数量')
const content = ref(0)
const excelStore = useExcelDataStore()

onMounted(async () => {
  await excelStore.loadAndSumDistance('src/assets/参访企业.xlsx');
  content.value = excelStore.totalDistance;
  console.log(excelStore.totalDistance); // 打印累加后的数量
});
// excelStore.loadAndSumDistance('src/assets/参访企业.xlsx');
// const content = excelStore.totalDistance;
</script>

<style scoped>
.box {

  height: 200px;
  width: 100%;
  position: relative;
}

/* 定义动画关键帧 */
@keyframes fadeInOut {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0.25;
  }

  50% {
    opacity: 0.5;
  }

  75% {
    opacity: 0.75;
  }

  100% {
    opacity: 1;
  }
}

.background {
  position: absolute;
  inset: 20px;
  /* 设置所有方向的边距为20px */
  background-image: url('src/assets/images/pic11.png');
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 0;
  /* 固定背景 */
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('src/assets/images/pic33.png');
  /* 动态背景图 */
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0;
  /* 初始透明度 */
  animation: fadeInOut 4s infinite;
  /* 渐变动画 */
  z-index: 1;
  /* 保证在主背景图上 */
}

/* 第二个动态背景 */
.background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('src/assets/images/pic44.png');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0;
  animation: fadeInOut 4s infinite alternate;
  z-index: 1;
}

.Title {
  position: absolute;
  top: 10px;
  /* 距离顶部10px */
  left: 10px;
  /* 距离左边10px */
  font-size: 16px;
  font-weight: bold;
  color: aliceblue;
}

.Content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 水平和垂直居中 */
  font-size: 24px;
  text-align: center;
  color: aliceblue;
}
</style>
