<template>
  <div class="scroll-wrapper">
    <!-- 表头 -->
    <div class="table-header">
      <div style="width: 5%;">排名</div>
      <div style="width: 18%;">姓名</div>
      <div style="width: 5%;">性别</div>
      <div style="width: 10%;">年级</div>
      <div style="width: 20%;">专业</div>
      <div style="width: 35%;">参观企业</div>
      <div style="width: 7%;">积分</div>
    </div>
    
    <div class="vertical-scoll" ref="scrollContainer">
      <vertical-scroll :list="list" hover="true" :step="0.05" wheel="true">
        <template v-slot="{ data, index }">
          <div 
            style="width: 100%; display: flex; line-height: 30px;" 
            @mouseenter="handleMouseEnter(index)" 
            @mouseleave="handleMouseLeave"
            :class="{'highlight': hoveredIndex === index}"
          >
          <div style="width: 5%;display: flex; justify-content: center;">{{ data.id }}</div>
            <div style="width: 18%;display: flex; justify-content: center;">{{ data.name }}</div>
            <div style="width: 5%;display: flex; justify-content: center;">{{ data.sex }}</div>
            <div style="width: 10%;display: flex; justify-content: center;">{{ data.grade }}</div>
            <div style="width: 20%;display: flex; justify-content: center;">{{ data.major }}</div>
            <div style="width: 35%;display: flex; justify-content: center;">{{ data.company}}</div>
            <div style="width: 7%;display: flex; justify-content: center;">{{ data.score }}</div>
          </div>
        </template>
      </vertical-scroll>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Vue3SeamlessScroll,VerticalScroll } from "vue3-seamless-scroll";

const scrollRef = ref(null);
const scrollDirection = ref("up");

// 高亮的行索引
const hoveredIndex = ref(null);

// 鼠标进入时设置高亮行
const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
};

// 鼠标离开时移除高亮
const handleMouseLeave = () => {
  hoveredIndex.value = null;
};

const listData = [
  {id: 1  ,name: "张三", sex: "男", grade: "大一", major: "计算机", company: "腾讯", score: 100},
  {id: 2  ,name: "李四", sex: "女", grade: "大二", major: "设计", company: "阿里", score: 90},
  {id: 3  ,name: "王五", sex: "男", grade: "大三", major: "金融", company: "百度", score: 80},
  {id: 4  ,name: "赵六", sex: "女", grade: "大四", major: "法律", company: "京东", score: 70},
  {id: 5  , name: "孙七", sex: "男", grade: "大五", major: "医学", company: "滴滴", score: 60},
  {id: 6  ,name: "周八",  sex: "女", grade: "大六", major: "建筑", company: "美团", score: 50},
  {id: 7  ,name: "吴九",  sex: "男", grade: "大七", major: "机械", company: "小米", score: 40},
  {id: 8  ,name: "郑十",  sex : "女", grade: "大八", major: "电子", company: "华为", score: 30},
  {id: 9  , name: "钱十一", sex: "男", grade: "大九", major: "通信", company: "字节跳动", score: 20},
  {id: 10 ,name: "孔十二", sex: "女", grade: "大十", major: "物联网", company: "拼多多", score: 10},
  {id: 11 ,name: "杨十三", sex: "男", grade: "大十一", major: "人工智能", company: "快手", score: 5},

];
const list = ref(listData);
</script>

<style>
.scroll-wrapper {
  display: flex;
  flex-direction: column;
}

.table-header {
  display: flex;
  width: 100%;
  padding: 10px 0;
  background-color: blue;
  font-weight: bold;

}

.table-header div {
  width: 50%;
  text-align: center;
}

.vertical-scoll {
  overflow: hidden;
  height: 300px;
}

.highlight {
  background-color: rgba(255, 255, 255, 0.2); /* 高亮的背景颜色 */
  font-weight: bold; /* 高亮的文字样式 */
}
</style>
