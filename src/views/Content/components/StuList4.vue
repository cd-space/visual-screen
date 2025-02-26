<template>
  <div class="vertical-scoll">
    <vue3-seamless-scroll :list="list" hover="true" :speed="0.5" wheel="true">
      <template v-slot="{ data }">
        <div style="width: 100%; display: flex; line-height: 30px;">
          <div>{{ data.name }}</div>
          <div>{{ data.id }}</div>
        </div>
      </template>
    </vue3-seamless-scroll>
  </div>
</template>
<script setup>
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll} from "vue3-seamless-scroll";


const listData = [
  {name: "张三",id : 1,}, 
  {name: "李四",id : 2,},
  {name: "王五",id : 3,},
  {name: "赵六",id : 4,},
  {name: "钱七",id : 5,},
  {name: "孙八",id : 6,},
  {name: "周九",id : 7,},
  {name: "吴十",id : 8,},
  {name: "郑十一",id : 9,},
  {name: "王十二",id : 10,},
  {name: "李十三",id : 11,},
  {name: "赵十四",id : 12,},
  {name: "孙十五",id : 13,},
  {name: "周十六",id : 14,},
  {name: "吴十七",id : 15,},
]
const list = ref(listData);
</script>

<style>
.vertical-scoll {
  overflow: hidden;
  height: 300px;
}

</style>