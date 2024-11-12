<script setup>
import LJSL from '@/views/Content/components/ljsl.vue'
import BYQX from '@/views/Content/components/byqx.vue'
import CYRS from '@/views/Content/components/cyrs.vue'
import CFLC from '@/views/Content/components/cflc.vue'
import ZYNJFB from '@/views/Content/components/zynjfb.vue'
import ConList from './components/ConList.vue';
import StuList from './components/StuList.vue';
</script>

<template>


    <div class="content">
        <div class="middle">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div style="width: 40vw;height:40vh;">
                        <bv-border-box name="border9">
                            <ConList></ConList>
                        </bv-border-box>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <ConList></ConList>
                    </div>
                </el-col>
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
.content {
    width: 100%;
    /* 横向占满整个宽度 */
    height: 100%;
    /* 高度为视口高度 */
    background-image: url('/src/assets/images/panel.png');
    /* 背景图片 */
    background-size: cover;
    /* 让背景图片覆盖整个区域 */
    background-position: center;
    /* 背景图片居中显示 */
    padding: 10px
}

.box {
    width: 100%;
    height: 200px;
}

.middle {
    margin-top: 70px;
    margin-bottom: 100px;
}
</style>