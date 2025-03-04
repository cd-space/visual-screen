<script setup>
import LJSL from '@/views/Content/components/ljsl.vue'
import BYQX from '@/views/Content/components/byqx.vue'
import CYRS from '@/views/Content/components/cyrs.vue'
import CFLC from '@/views/Content/components/cflc.vue'
import ZYNJFB from '@/views/Content/components/zynjfb.vue'
import ConList2 from './components/ConList2.vue';

import VideoPlayer from './components/VideoPlayer.vue'
import ConCar1 from './components/ConCar1.vue'


import StuList2 from './components/StuList2.vue';

import { ref } from 'vue'

</script>

<template>


    <div class="content">
        <div class="middle">
            <div style="height: 17%; width: 100%; padding-top: 30px; box-sizing: border-box;">
                <ConCar1></ConCar1>
            </div>
            <div
                style="height: 83%; width: 100%;padding-top: 10px; display: flex;justify-content: space-between;box-sizing: border-box">
                <div style="width: 34%; height: 100%;padding: 0px 25px 25px 25px;;" class="box1">
                    <ConList2></ConList2>
                </div>
                <div style="width: 32%; height: 100%; padding: 0 10px;">
                    <VideoPlayer></VideoPlayer>
                </div>
                <div style="width: 34%; height: 100%;padding: 0px 25px 25px 25px;" class="box1">
                    <StuList2></StuList2>
                </div>
            </div>

        </div>

        <div class="footer">
            <div class="box">
                <LJSL></LJSL>
            </div>
            <div class="box">
                <CFLC></CFLC>
            </div>
            <div class="box">
                <CYRS></CYRS>
            </div>


            <div class="box">
                <ZYNJFB></ZYNJFB>
            </div>


            <div class="box">
                <BYQX></BYQX>
            </div>
        </div>



    </div>

</template>




<style scoped>
.content {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box
}

/* .footer {
    width: 100%;
    height: 30%;
    padding: 20px 0;
    box-sizing: border-box;
} */

.footer {
    gap: 10px;
    width: 100%;
    height: 30%;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
}

.box {
    width: calc(100% - 40px);
    height: 100%;
    background-image: url('/src/assets/images/panel.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    box-sizing: border-box
}

.box1 {
    width: 100%;
    height: 100%;
    background-image: url('/src/assets/images/panel.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    box-sizing: border-box
}

.el-row {
    height: 100%;
    margin: 0;
    padding: 0;
}

.el-col {
    height: 100%;
    margin: 0;
    padding: 0;
}

.middle {
    height: 70%;
    margin: 0;
}

/* .video-player {
    height: 300px;
} */

.StuList {
    height: 100%;
}
</style>
