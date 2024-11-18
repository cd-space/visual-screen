<template>
    <div class="time-display">
      <p>{{ nowTime }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    name: "TimeDisplay",
    setup() {
      const year = ref(0); // 年份
      const month = ref(0); // 月份
      const week = ref(""); // 星期几
      const day = ref(0); // 天数
      const hour = ref(""); // 小时
      const minute = ref(""); // 分钟
      const second = ref(""); // 秒
      const nowTime = ref(""); // 当前时间
  
      // 更新时间
      const updateTime = () => {
        const date = new Date();
        year.value = date.getFullYear();
        month.value = date.getMonth() + 1;
        week.value = "日一二三四五六".charAt(date.getDay());
        day.value = date.getDate();
        hour.value = String(date.getHours()).padStart(2, "0");
        minute.value = String(date.getMinutes()).padStart(2, "0");
        second.value = String(date.getSeconds()).padStart(2, "0");
        nowTime.value = `${year.value}年${month.value}月${day.value}日 星期${week.value} ${hour.value}:${minute.value}:${second.value}`;
      };
  
      // 每秒更新一次
      onMounted(() => {
        updateTime();
        setInterval(updateTime, 1000);
      });
  
      return { nowTime };
    },
  };
  </script>
  
  <style scoped>
  .time-display {
    font-size: 1.2em;
    color: #333;
  }
  </style>
  