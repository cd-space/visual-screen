<template>
    <div class="video-player">
      <!-- 使用 video.js 创建的视频播放器 -->
      <video ref="videoPlayer" class="video-js vjs-default-skin" controls @dblclick="disableFullScreen" autoplay></video>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import videojs from 'video.js'
  import 'video.js/dist/video-js.css'
  
  const videoPlayer = ref(null)
  
  onMounted(() => {
    // 使用 video.js 创建播放器并初始化
    videojs(videoPlayer.value, {
      autoplay: true,
      muted: true,
      controls: true,
      loop: true,
      sources: [
        {
          src: '1234.mp4',
          type: 'video/mp4'
        }
      ],
      controlBar: {
      fullscreenToggle: false  // 禁用全屏按钮
    }
    })
  })
  
  // 禁用双击全屏的函数
  const disableFullScreen = (event) => {
    event.preventDefault()  // 阻止浏览器默认的双击全屏行为
  }
  </script>
  
  <style scoped>
  .video-player {
    width: 100%;
    height: 100%;
    margin: 0 auto;

  }
  
  .video-js {
    width: 100%;
    height: 100%;
  }
  </style>
  