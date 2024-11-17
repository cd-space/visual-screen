<template>
  <div class="marquee-container" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
    <marquee-text
      ref="marquee"
      :speed="50"
      direction="left"
      :loop="true"
      :pause-on-hover="false"
      class="marquee"
    >
      <a
        v-for="(badge, index) in badges"
        :key="index"
        :href="badge.link"
        target="_blank"
        class="badge-link"
      >
        <img :src="badge.image" :alt="badge.name" class="badge-img" />
      </a>
    </marquee-text>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MarqueeText from 'vue-marquee-text-component';

const badges = [
  { image: "/src/assets/images/xiaohui.png", name: "校徽", link: "https://example.com/xiaohui" },
  { image: "/src/assets/images/yuanhui.png", name: "院徽", link: "https://example.com/yuanhui" },
  // { image: "/src/assets/images/badge3.png", name: "徽章3", link: "https://example.com/badge3" },
  // { image: "/src/assets/images/badge4.png", name: "徽章4", link: "https://example.com/badge4" },
];

// 手动控制动画播放状态
const marquee = ref(null);

const pauseMarquee = () => {
  if (marquee.value) {
    marquee.value.style.animationPlayState = "paused"; // 暂停滚动
  }
};

const resumeMarquee = () => {
  if (marquee.value) {
    marquee.value.style.animationPlayState = "running"; // 恢复滚动
  }
};
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  height: 80px;
  display: flex;
  align-items: center;
}

.marquee {
  display: flex;
  align-items: center;
}

.badge-link {
  margin: 0 20px; /* 每个徽章的间距 */
  display: inline-block;
  text-decoration: none;
}

.badge-img {
  width: 50px; /* 调整徽章大小 */
  height: 50px;
  object-fit: contain;
  transition: transform 0.2s ease; /* 添加交互效果 */
}

.badge-img:hover {
  transform: scale(1.1); /* 鼠标悬停放大 */
}
</style>
