<template>
  <div class="container">
    <!-- 替换为动态图片列表 -->
    <marquee-text
      ref="marquee"
      speed="70"
      @mouseenter="pauseMarquee"
      @mouseleave="resumeMarquee"
    >
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        alt="动态图片"
        class="image"
        @click="showDialog(index)" 
      />
    </marquee-text>

    <!-- 弹窗 -->
    <div v-if="dialogVisible" class="dialog">
      <div class="dialog-content">
        <img :src="selectedImage" alt="当前图片" />
        <p>这是图片 {{ selectedIndex + 1 }} 的描述</p>
        <button @click="closeDialog">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MarqueeText from "vue-marquee-text-component";

// 定义动态图片数组
const images = ref([
  "/src/assets/images/xiaohui.png",
  "/src/assets/images/yuanhui.png",
  "/src/assets/images/xiaohui.png",
]);

// 弹窗相关逻辑
const dialogVisible = ref(false);
const selectedImage = ref(""); // 当前选中图片的地址
const selectedIndex = ref(-1); // 当前选中图片的索引

// 显示弹窗
const showDialog = (index) => {
  dialogVisible.value = true;
  selectedImage.value = images.value[index];
  selectedIndex.value = index;
};

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
};

// 跑马灯暂停和恢复逻辑
const marquee = ref(null);
const pauseMarquee = () => {
  if (marquee.value) marquee.value.pause();
};
const resumeMarquee = () => {
  if (marquee.value) marquee.value.resume();
};
</script>

<style>
.container {
  position: relative;
}

/* 图片样式 */
.image {
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
  cursor: pointer; /* 鼠标指针变成手型 */
}

/* 弹窗样式 */
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
}

.dialog-content img {
  max-width: 200px;
  max-height: 200px;
  display: block;
  margin: 0 auto 20px;
}

.dialog-content button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dialog-content button:hover {
  background-color: #0056b3;
}

/* 遮罩层 */
.dialog::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>
