<script setup>
import LJSL from '@/views/Content/components/ljsl.vue'
import BYQX from '@/views/Content/components/byqx.vue'
import CYRS from '@/views/Content/components/cyrs.vue'
import CFLC from '@/views/Content/components/cflc.vue'
import ZYNJFB from '@/views/Content/components/zynjfb.vue'
import ConList from './components/ConList.vue';
import StuList from './components/StuList.vue';
import VideoPlayer from './components/VideoPlayer.vue'
import ComCarousel from './components/ComCarousel.vue'
import ConCar1 from './components/ConCar1.vue'

</script>

<template>


    <div class="content">
        <div class="middle">
            <el-row :gutter="10">
                <el-col :span="24">

                    <ConCar1></ConCar1>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div>
                        <bv-border-box name="border9">
                            <ConList></ConList>
                        </bv-border-box>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="video-player">
                        <VideoPlayer></VideoPlayer>
                    </div>
                </el-col>
                <!-- 就业积分 -->
                <el-col :span="8">
                    <div>
                        <StuList></StuList>
                    </div>
                </el-col>
            </el-row>

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
.footer {
    padding: 0 20px;
}

.video-player {
    height: 300px;
}

.content {
    width: 100%;
    height: 100%;
    background-image: url('/src/assets/images/panel.png');
    background-size: cover;
    background-position: center;
    padding: 10px
}

.box {
    width: 100%;
    height: 200px;
    background-image: url('/src/assets/images/panel.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.middle {
    margin-top: 70px;
    margin-bottom: 100px;
}
</style>
