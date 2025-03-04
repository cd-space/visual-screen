<template>
  <div class="productProcess">
    <!-- 如果页面刷新数据比较频繁，可以将loading、showFlag的相关代码删除，防止过于频繁的出现加载动画 -->
    <div class="loading_div">
      实践积分排行榜
    </div>
    <div class="success_info_body" v-show="showFlag">
      <!-- 参数名称、列数根据实际情况调整 -->
      <div class="table_body">
        <div class="table_th">
          <div class="tr1 th_style">排名</div>
          <div class="tr2 th_style">姓名</div>
          <div class="tr3 th_style">性别</div>
          <div class="tr4 th_style">年级</div>
          <div class="tr5 th_style">专业</div>
          <div class="tr6 th_style">参观企业</div>
          <div class="tr7 th_style">积分</div>
        </div>

        <div class="table_main_body"
             @wheel.prevent="handleWheel"
             @mouseenter="pauseScroll"
             @mouseleave="resumeScroll"
             @touchmove="handleWheel"
              @touchstart="handleTouchStart"
            >
          <div class="table_inner_body" :style="{ top: tableTop + 'px' }">
            <div class="table_tr" v-for="(item, index) in tableList" :key="index"  @mouseenter="highlightRow(index)" @mouseleave="resetHighlight" :class="{ highlighted: index === highlightedIndex }">
              <div class="tr1 tr">{{ item.id }}</div>
              <div class="tr2 tr">{{ item.name }}</div>
              <div class="tr3 tr">{{ item.sex }}</div>
              <div class="tr4 tr">{{ item.grade }}</div>
              <div class="tr5 tr">{{ item.major }}</div>
              <div class="tr6 tr">{{ item.company }}</div>
              <div class="tr7 tr">{{ item.score }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useUserInfoStore } from '@/stores/stulist';
// 定义状态
const showFlag = ref(true);
const tableTop = ref(0);
const tableList = ref([
{id: 1  ,name: "张三", sex: "男", grade: "大一", major: "计算机", company: "腾讯", score: 100},
  {id: 2  ,name: "李四", sex: "女", grade: "大二", major: "设计", company: "阿里", score: 90},
  {id: 3  ,name: "王五", sex: "男", grade: "大三", major: "金融", company: "百度", score: 80},
  {id: 4  ,name: "赵六", sex: "女", grade: "大四", major: "法律", company: "京东", score: 70},
  {id: 5  , name: "孙七", sex: "男", grade: "大五", major: "医学", company: "滴滴", score: 60},
  {id: 6  ,name: "周八",  sex: "女", grade: "大六", major: "建筑", company: "美团", score: 50},
  {id: 7  ,name: "吴九",  sex: "男", grade: "大七", major: "机械", company: "小米", score: 40},
  {id: 8  ,name: "郑十",  sex : "女", grade: "大八", major: "电子", company: "华为", score: 30},
  {id: 9  , name: "钱十一", sex: "男", grade: "大九", major: "通信", company: "字节跳动", score: 20},
]);

const tableListSize = ref(0);
const tableTimer = ref(null);
const componentTimer = ref(null);
const isManualScrolling = ref(false);
const resumeTimer = ref(null);
const minTop = ref(-Infinity);
const wheelTimeout = ref(null);

const stores = useUserInfoStore();

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
  stores.loadExcelData('学生第二期.xlsx');
  console.log(stores.data);

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

// 记录触摸开始位置
const touchStartY = ref(0);

const handleTouchStart = (event) => {
  touchStartY.value = event.touches[0].clientY;
};

const handleWheel = (event) => {
  if (!wheelTimeout.value) {
    let delta;
    if (event.type === 'wheel') {
      delta = Math.sign(event.deltaY) * wheelStep;
    } else if (event.type === 'touchmove') {
      const touch = event.touches[0];
      delta = Math.sign(touch.clientY - touchStartY.value) * wheelStep;
      touchStartY.value = touch.clientY;
    }

    let newTop = tableTop.value + delta;
    newTop = Math.min(Math.max(newTop, minTop.value), 0);
    tableTop.value = newTop;

    wheelTimeout.value = setTimeout(() => {
      wheelTimeout.value = null;
    }, 50);
  }
  // event.preventDefault();
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
  height: 10%;
  font-size: 23px;
  padding: 15px 0 0px 0;
  box-sizing: border-box;
}
.title_div {
  width: 100%;
}
.table_body {
  width: 100%;
  height: 100%;
  /* padding-top:  10px; */
  box-sizing: border-box;
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
  width: 8%;
}

.tr2 {
  width: 18%;
}

.tr3 {
  width: 8%;
}

.tr4 {
  width: 10%;
}

.tr5 {
  width: 20%;
}

.tr6 {
  width: 28%;
  font-size: 13px;
}

.tr7 {
  width: 8%;
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
  height: calc(100% - 40px);
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
  height: 100%;
}

.success_info_body{
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table_tr:hover {
  background-color: rgba(3, 145, 167, 0.3);
}

/* 高亮显示的样式 */
.table_tr.highlighted {
  background-color: rgba(0, 221, 253, 0.5);
}

.news-link {
  color: #00ddfd;
  text-decoration: none;
}

.news-link:hover {
  text-decoration: underline;
}
</style>
