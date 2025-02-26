<template>
    <div class="table-container" @mouseover="onHover" @mouseleave="onLeave">
      <vue3-seamless-scroll 
        :list="tableData"
        v-model="isScrolling"
        :direction="'up'" 
        :visibleCount="10" 
        :hover="true"
        :wheel="true" 
        :singleLine="false"
        :ease="'cubic-bezier(0.03, 0.76, 1, 0.16)'"
      >
        <template v-slot="{ data }">
          <div :class="['table-row', { 'zebra-striped': data.id % 2 === 0 }]">
            <div class="table-cell">{{ data.id }}</div>
            <div class="table-cell">{{ data.name }}</div>
          </div>
        </template>
      </vue3-seamless-scroll>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
  
  // 模拟生成1000条数据
  const tableData = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `数据项 #${i + 1}`,
  }));
  
  export default defineComponent({
    name: "ScrollableTable",
    components: {
      Vue3SeamlessScroll
    },
    setup() {
      const tableDataRef = ref(tableData);
      const isScrolling = ref(true);
  
      // 鼠标悬停时暂停滚动
      const onHover = () => {
        isScrolling.value = false;
      };
  
      // 鼠标离开时恢复滚动
      const onLeave = () => {
        isScrolling.value = true;
      };
  
      return {
        tableData: tableDataRef,
        isScrolling,
        onHover,
        onLeave
      };
    }
  });
  </script>
  
  <style scoped>
  .table-container {
    width: 100%;
    height: 400px; /* 高度可根据需要调整 */
    overflow: hidden;
    position: relative;
  }
  
  .table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .table-cell {
    flex: 1;
  }
  
  .zebra-striped {
    background-color: #f4f4f4; /* 斑马条纹效果 */
  }
  
  </style>
  