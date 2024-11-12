<template>
  <div class="box">
    <div class="background">
      <div class="Title">{{ title }}</div>
      <div class="Content">{{ content }}km</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const title = ref('累计数量')
const content = ref(88888)
</script>

<style scoped>
.box {

  height: 200px;
  width: 100%;
  position: relative;
}

.background {
  position: absolute;
  inset: 20px;
  /* 设置所有方向的边距为20px */
  background-image: url('src/assets/images/图层 1.png');
  background-repeat: no-repeat;
  background-size: contain;
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