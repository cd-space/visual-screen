<template>
  <div class="marquee-container" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
    <marquee-text
     ref="marquee"
      :repeat="repeatTimes"
      :duration="5"
      :paused="paused">
      <a v-for="(badge, index) in badges" :key="index" :href="badge.link" target="_blank" class="badge-link">
        <img :src="badge.image" :alt="badge.name" class="badge-img" />
      </a>
    </marquee-text>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MarqueeText from "vue-marquee-text-component";

const iconWidth = 50;
const repeatTimes = ref(20);
const paused = ref(false);

const badges = [
  {
    image: "src/assets/conpanylogs/CJAE.jpg",
    name: "校徽",
    link: "https://www.douyin.com/",
  },
  {
    image: "src/assets/conpanylogs/CML.png",
    name: "院徽",
    link: "https://example.com/yuanhui",
  },
  {
    image: "src/assets/conpanylogs/Deloite.jpg",
    name: "校徽",
    link: "https://example.com/xiaohui",
  },
  {
    image: "src/assets/conpanylogs/Haier.jpeg",
    name: "院徽",
    link: "https://example.com/yuanhui",
  },
  {
    image: "src/assets/conpanylogs/oppo.jpeg",
    name: "校徽",
    link: "https://example.com/xiaohui",
  },
  {
    image: "src/assets/conpanylogs/RangeZhihui.jpeg",
    name: "院徽",
    link: "https://example.com/yuanhui",
  },
  {
    image: "src/assets/conpanylogs/sstp.jpg",
    name: "院徽",
    link: "https://example.com/yuanhui",
  },
];

// 手动控制动画播放状态
const marquee = ref(null);

const pauseMarquee = () => {
  if (marquee.value) {
    paused.value = true;
  }
};

const resumeMarquee = () => {
  if (marquee.value) {
    paused.value = false;
  }
};

onMounted(() => {
  // 计算出icon需要重复多少次才能填满与浏览器窗口等宽的容器
  if (!isNaN(document.body.clientWidth)) {
    repeatTimes.value = Math.ceil(document.body.clientWidth / iconWidth);
  }
});
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
}

.marquee {
  display: flex;
  align-items: center;
}

.badge-link {
  margin: 0 20px;
  display: inline-block;
  text-decoration: none;
}

.badge-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.2s ease;
  border-radius: 25%;
}

.badge-img:hover {
  transform: scale(1.1);
}
</style>
