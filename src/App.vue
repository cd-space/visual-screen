<script setup>

</script>

<template>

  <RouterView />
  
</template>

<style >
/* 在 styles.css 或 App.vue 的 <style> 中 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
    background-color: #ADD8E6; /* 背景颜色 */
    overflow: hidden; /* 防止滚动 */
    margin: 0;
    padding: 0;
}

#app {
    width: 100vw; /* 视口宽度 */
    height: 100vh; /* 视口高度 */
    /* padding: 2rem; 内边距 */
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* 包含内边距在内 */
}

</style>
