<template>
  <div class="marquee-container" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
    <marquee-text
  v-if="badges.length"
  ref="marquee"
  :repeat="repeatTimes"
  :duration="10"
  :paused="paused"
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
import { onMounted, ref } from "vue";
import MarqueeText from "vue-marquee-text-component";

const iconWidth = 50;
const repeatTimes = ref(20);
const paused = ref(false);

const badges = ref([]);

const fetchBadges = async () => {
  try {
    const res = await fetch('/imageList.json');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    badges.value = data.logos; // 将数据赋值给 badges
    console.log('Fetched badges:', badges.value);
  } catch (error) {
    console.error('Error fetching badges:', error);
  }
};



// const badges = [
//   {
//     image: "/conpanylogs/CJAE.jpg",
//     name: "校徽",
//     link: "https://www.douyin.com/",
//   },
//   {
//     image: "/conpanylogs/CML.png",
//     name: "院徽",
//     link: "https://example.com/yuanhui",
//   },
//   {
//     image: "/conpanylogs/Deloite.jpg",
//     name: "校徽",
//     link: "https://example.com/xiaohui",
//   },
//   {
//     image: "/conpanylogs/Haier.jpeg",
//     name: "院徽",
//     link: "https://example.com/yuanhui",
//   },
//   {
//     image: "/conpanylogs/oppo.jpeg",
//     name: "校徽",
//     link: "https://example.com/xiaohui",
//   },
//   {
//     image: "/conpanylogs/RangeZhihui.jpeg",
//     name: "院徽",
//     link: "https://example.com/yuanhui",
//   },
//   {
//     image: "/conpanylogs/sstp.jpg",
//     name: "院徽",
//     link: "https://example.com/yuanhui",
//   },
// ];

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

onMounted(async () => {
  await fetchBadges();

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
  width: 75px;
  height: 50px;
  object-fit: contain;
  transition: transform 0.2s ease;
  border-radius: 20px;
}

.badge-img:hover {
  transform: scale(1.1);
}
</style>
