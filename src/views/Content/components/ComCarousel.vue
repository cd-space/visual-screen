<template>
  <div class="marquee">
    <div class="badge-container">
      <img v-for="(badge, index) in badges" :key="index" :src="badge" alt="徽章" class="badge-img" />
    </div>
  </div>
</template>

<script setup>
const badges = [
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",


];
</script>

<style scoped>
.marquee {
  overflow: hidden; /* 隐藏超出的内容 */
  white-space: nowrap;
  width: 100vw;
  height: 80px; /* 根据徽章大小调整 */
  position: relative;
  /* background-color: #f5f5f5;  */
}

.badge-container {
  display: inline-block;
  animation: marquee 10s linear infinite; /* 动画持续10秒，线性播放，无限循环 */
}

.badge-img {
  width: 50px; /* 徽章宽度 */
  height: 50px; /* 徽章高度 */
  margin: 0 10px; /* 徽章间距 */
  object-fit: contain;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
