<template>
  <div class="productProcess">
    <!-- 如果页面刷新数据比较频繁，可以将loading、showFlag的相关代码删除，防止过于频繁的出现加载动画 -->
    <div class="loading_div">
      参访企业
    </div>
    <div class="success_info_body" v-show="showFlag">
      <!-- 参数名称、列数根据实际情况调整 -->
      <div class="table_body">
        <div class="table_th">
          <div class="tr1 th_style">单位</div>
          <div class="tr2 th_style">人数</div>
          <div class="tr3 th_style">日期</div>
          <div class="tr4 th_style">新闻链接</div>
        </div>

        <div class="table_main_body" @wheel.prevent="handleWheel" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
          <div class="table_inner_body" :style="{ top: tableTop + 'px' }">
            <div class="table_tr" v-for="(item, index) in tableList" :key="index" @mouseenter="highlightRow(index)"
              @mouseleave="resetHighlight" :class="{ highlighted: index === highlightedIndex }">
              <div class="tr1 tr">{{ item.company }}</div>
              <div class="tr2 tr">{{ item.number }}</div>
              <div class="tr3 tr">{{ item.date }}</div>
              <div class="tr4 tr"><a :href="item.link" target="_blank" class="news-link">
                  {{ item.link }}
                </a></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { number } from 'echarts';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

// 定义状态
const showFlag = ref(true);
const tableTop = ref(0);
const tableList = ref([
  {company:"海尔",number:20,date:"2024.10.14",link:"https://www.douyin.com/"},
  {company:"海尔2",number:20,date:"2024.10.14",link:"https://www.douyin.com/"},
  {company:"海尔3",number:20,date:"2024.10.14",link:"https://www.douyin.com/"},
  {company:"海尔4",number:20,date:"2024.10.14",link:"1111111111111"},
  {company:"海尔5",number:20,date:"2024.10.14",link:"1111111111111"},
  {company:"海尔6",number:20,date:"2024.10.14",link:"1111111111111"},
  {company:"海尔7",number:20,date:"2024.10.14",link:"1111111111111"},
  {company:"海尔8",number:20,date:"2024.10.14",link:"1111111111111"},

]);

const tableListSize = ref(0);
const tableTimer = ref(null);
const componentTimer = ref(null);
const isManualScrolling = ref(false);
const resumeTimer = ref(null);
const minTop = ref(-Infinity);
const wheelTimeout = ref(null);

// 配置参数
const title = '排产进度';
const visibleSize = 2; // 容器内可视最大完整行数
const lineHeight = 67; // 每行的实际高度（包含margin-top/bottom,border等）
const componentTimerInterval = 3600000; // 刷新数据的时间间隔
const tableTimerInterval = 50; // 向上滚动 1px 所需要的时间，越小越快，推荐值 100
const wheelStep = 50; // 每次滚动的步长

// 初始化
onMounted(() => {
  bsGetProductProcess();
  componentTimerFun();
  calculateMinTop();
});

// 销毁时清除定时器
onBeforeUnmount(() => {
  clearInterval(componentTimer.value);
  clearInterval(tableTimer.value);
});

// 获取数据并处理
const bsGetProductProcess = () => {
  clearInterval(tableTimer.value);
  tableTop.value = 0;
  showFlag.value = true;
  tableActionFun();
};

// 处理表格数据
const tableActionFun = () => {
  tableListSize.value = tableList.value.length;
  if (tableListSize.value > visibleSize) {
    tableList.value = [...tableList.value, ...tableList.value]; // 复制数据
    tableTimerFun();
  }
};

// 填充表格数据（当数据过少时使用）
// const fillTableList = () => {
//   const addLength = visibleSize - tableListSize.value;
//   for (let i = 0; i < addLength; i++) {
//     tableList.value.push({
//       planNo: '-',
//       type: '-',
//       startDate: '-',
//       endDate: '-',
//       process: '-',
//     });
//   }
// };

// 滚动计时器
const tableTimerFun = () => {
  clearInterval(tableTimer.value);
  const totalHeight = lineHeight * (tableList.value.length / 2);
  tableTimer.value = setInterval(() => {
    if (tableTop.value <= -totalHeight) {
      tableTop.value = 0;
    } else {
      tableTop.value -= 1;
    }
  }, tableTimerInterval);
};

// 自动刷新数据
const componentTimerFun = () => {
  componentTimer.value = setInterval(() => {
    bsGetProductProcess();
  }, componentTimerInterval);
};

// 暂停滚动
const pauseScroll = () => {
  isManualScrolling.value = true;
  clearInterval(tableTimer.value);
};

// 恢复滚动
const resumeScroll = () => {
  isManualScrolling.value = false;
  if (tableListSize.value > visibleSize) {
    tableTimerFun();
  }
};

// 处理滚轮事件
const handleWheel = (event) => {
  if (!wheelTimeout.value) {
    const delta = Math.sign(event.deltaY) * wheelStep;
    let newTop = tableTop.value + delta;

    newTop = Math.min(Math.max(newTop, minTop.value), 0);

    tableTop.value = newTop;

    wheelTimeout.value = setTimeout(() => {
      wheelTimeout.value = null;
    }, 50);
  }
  event.preventDefault();
};

// 计算最小 top 值
const calculateMinTop = () => {
  const containerHeight = 294; // 对应.table_main_body的高度
  const contentHeight = lineHeight * tableList.value.length;
  minTop.value = containerHeight - contentHeight;
};


const highlightedIndex = ref(null); // 用于存储当前悬停的行索引

// 鼠标进入时高亮当前行
const highlightRow = (index) => {
  highlightedIndex.value = index;
};

// 鼠标离开时取消高亮
const resetHighlight = () => {
  highlightedIndex.value = null;
};

</script>


<style scoped>
.productProcess {
  width: 100%;
  height: 100%;
}
.loading_div {
  color: #eee;
  width: 100%;
  height: 5%;
  font-size: 23px;
  margin: 15px 0 0px 0;
}
.title_div {
  width: 100%;
}
.table_body {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.table_th {
  width: 100%;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.tr {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 5px;
  text-align: center;
  font-size: 14px;
}
.tr1 {
  width: 35%;
}
.tr2 {
  width: 10%;
}
.tr3 {
  width:25%;
}
.tr4 {
  width: 30%;
}

.th_style {
  color: rgb(0, 221, 253);
  font-weight: bold;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 5px;
  text-align: center;
}
.table_main_body {
  width: 100%;
  height: 85%;
  overflow: hidden;
  position: relative;
}
.table_inner_body {
  width: 100%;
  position: absolute;
  left: 0;
}
.table_tr {
  display: flex;
  height: 60px;
  line-height: 60px;
  color: #eee;
  font-size: 25px;
  background: rgba(3, 145, 167, 0.1);
  border: 1px solid rgb(4, 114, 131);
  margin-top: 7px;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.productProcess {
  width: 100%;
  height: 100%; /* 或者设置一个具体的高度 */
}

.success_info_body{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table_tr:hover {
  background-color: rgba(3, 145, 167, 0.3); /* 鼠标悬停时的背景色 */
}

/* 高亮显示的样式 */
.table_tr.highlighted {
  background-color: rgba(0, 221, 253, 0.5); /* 高亮时背景颜色 */
}

.news-link {
  color: #00ddfd; /* 设置链接的颜色 */
  text-decoration: none; /* 去掉默认的下划线 */
}

.news-link:hover {
  text-decoration: underline; /* 悬停时加下划线 */
}
</style>