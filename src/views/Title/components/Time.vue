<template>
  <div class="datetime">
    <span class="time">{{ currentDateTime.year }}</span>
    <span class="datetime">年</span>
    <span class="time">{{ currentDateTime.month }}</span>
    <span class="datetime">月</span>
    <span class="time">{{ currentDateTime.day }}</span>
    <span class="datetime">日</span>
    <span class="time">{{ currentDateTime.hour }}</span>
    <span class="datetime">时</span>
    <span class="time">{{ currentDateTime.minute }}</span>
    <span class="datetime">分</span>
    <span class="time">{{ currentDateTime.second }}</span>
    <span class="datetime">秒</span>
    <span class="time">{{ currentDateTime.weekday }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// 设置 dayjs 的语言为中文
dayjs.locale('zh-cn')
const currentDateTime = ref('')

onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000) 
})

function updateDateTime() {
  const now = dayjs()
  currentDateTime.value = {
    year: now.year(),
    month: now.month() + 1,  // month 是从 0 开始的，所以要加 1
    day: now.date(),
    hour: now.hour(),
    minute: now.minute(),
    second: now.second(),
    weekday: now.format('dddd'), // 获取星期几的汉字表示
  }
}
</script>

<style scoped>
.datetime {
  font-family: Arial, sans-serif;
  font-size: 0.8vw;
  line-height: 1.5;
  font-weight: bold;
  color: white;
  margin-left: 2px;
}


.time {
  font-size: 1.3vw;
  color: yellow;
  font-weight: bold;
}
</style>