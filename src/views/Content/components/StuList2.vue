<template>
  <div class="data-screen-table" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <!-- 表头 -->
    <div class="table-header">
      <div class="header-cell" v-for="col in columns" :key="col.key">
        {{ col.title }}
      </div>
    </div>

    <!-- 滚动内容区 -->
    <div class="scroll-container" ref="scrollContainer" @wheel.passive="handleWheel">
      <vue3-seamless-scroll
        ref="scrollInstance"
        :list="dataSource"
        :hover="false"
        :step="0.5"
        :wheel="false"
        :direction="scrollDirection"
        :autoPlay="autoPlay"
        class="scroll-wrapper"
      >
        <div class="table-body">
          <div v-for="(item, index) in dataSource" :key="index" class="table-row">
            <div class="body-cell" v-for="col in columns" :key="col.key">
              {{ item[col.key] }}
            </div>
          </div>
        </div>
      </vue3-seamless-scroll>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Vue3SeamlessScroll from 'vue3-seamless-scroll'

const props = defineProps({
  // 表格列配置
  columns: {
    type: Array,
    default: () => [
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '城市', key: 'city' },
      { title: '职务', key: 'position' }
    ]
  },
  // 数据源
  dataSource: {
    type: Array,
    default: () => [
      { name: '张三', age: 28, city: '北京', position: '工程师' },
      { name: '李四', age: 32, city: '上海', position: '设计师' },
      // ...更多数据
    ]
  }
})

const autoPlay = ref(true) // 自动播放状态
const scrollDirection = ref('up') // 滚动方向
const scrollInstance = ref(null) // 滚动组件实例
const scrollContainer = ref(null) // 容器DOM引用

// 鼠标滚轮事件处理
const handleWheel = (e) => {
  const delta = Math.sign(e.deltaY)
  scrollDirection.value = delta > 0 ? 'down' : 'up'
  
  // 手动滚动时暂停自动滚动
  autoPlay.value = false
  resetScroll()
  
  // 2秒后恢复自动滚动
  clearTimeout(window.scrollTimer)
  window.scrollTimer = setTimeout(() => {
    autoPlay.value = true
  }, 2000)
}

// 重置滚动状态
const resetScroll = () => {
  if (scrollInstance.value) {
    scrollInstance.value.reset()
  }
}

// 暂停滚动
const pauseScroll = () => {
  autoPlay.value = false
}

// 恢复滚动
const resumeScroll = () => {
  autoPlay.value = true
}

// 初始化容器高度
const initContainerHeight = () => {
  if (scrollContainer.value) {
    const headerHeight = 40
    scrollContainer.value.style.height = `calc(100% - ${headerHeight}px)`
  }
}

onMounted(() => {
  initContainerHeight()
  window.addEventListener('resize', initContainerHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', initContainerHeight)
  clearTimeout(window.scrollTimer)
})
</script>

<style scoped>
.data-screen-table {
  width: 100%;
  height: 600px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: 1px solid #434343;
}

.table-header {
  display: flex;
  background: #1a1a1a;
  padding: 0 16px;
  height: 40px;
  align-items: center;
}

.header-cell {
  flex: 1;
  font-weight: bold;
  color: #00f7ff;
}

.scroll-container {
  position: relative;
  overflow: hidden;
}

.scroll-wrapper {
  width: 100%;
  height: 100%;
}

.table-body {
  padding: 0 16px;
}

.table-row {
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #434343;
  transition: background 0.3s;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.1);
}

.body-cell {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 247, 255, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>