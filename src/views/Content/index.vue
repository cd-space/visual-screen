<script setup>
import LJSL from '@/views/Content/components/ljsl.vue'
import BYQX from '@/views/Content/components/byqx.vue'
import CYRS from '@/views/Content/components/cyrs.vue'
import CFLC from '@/views/Content/components/cflc.vue'
import ZYNJFB from '@/views/Content/components/zynjfb.vue'
import ConList2 from './components/ConList2.vue';
import StuList from './components/StuList.vue';
import VideoPlayer from './components/VideoPlayer.vue'
import ConCar1 from './components/ConCar1.vue'

import StuList3 from './components/StuList3.vue';
import StuList2 from './components/StuList2.vue';
import StuList4 from './components/StuList4.vue';
import { ref } from 'vue'

</script>

<template>


    <div class="content">
        <div class="middle">
            <div style="height: 17%; width: 100%;">
                <ConCar1></ConCar1>
            </div>
            <div style="height: 83%; width: 100%;margin-top: 10px; display: flex;justify-content: space-between;">
                <div style="width: 34%; height: 100%;padding: 0px 25px 25px 25px;;" class="box">
                    <ConList2></ConList2>
                </div>
                <div style="width: 30%; height: 100%;">
                    <VideoPlayer></VideoPlayer>
                </div>
                <div style="width: 34%; height: 100%;padding: 0px 25px 25px 25px;" class="box">
                    <StuList2></StuList2>
                </div>
            </div>

        </div>


        <div class="footer">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="box">
                        <LJSL></LJSL>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="box">
                        <CFLC></CFLC>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="box">
                        <CYRS></CYRS>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="box">
                        <ZYNJFB></ZYNJFB>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="box">
                        <BYQX></BYQX>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>




<style scoped>
.content {
    width: 100%;
    height: calc(66vh - 10px);
    /* 减去间距的高度 */
    background-size: cover;
    background-position: center;
    padding: 10px;
}

.footer {
    height: 24vh;
    padding: 10px 10px 0 0;
    /* 调整内边距 */
    margin-top: 10px;
    /* 添加顶部间距 */
}

.box {
    width: 100%;
    height: 100%;
    background-image: url('/src/assets/images/panel.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
}

.el-row {
    height: 100%;
}

.middle {
    height: 100%;
    /* 改为100% */
    margin: 0;
    /* 移除上下边距 */
}

/* .video-player {
    height: 300px;
} */

.StuList {
    height: 100%;
}
</style>
