<script setup>
import BYQX from '@/views/Content/components/byqx.vue'
</script>

<template>
    <div class="content">
        <el-row>
            <el-col :span="24">
                <div style="height: 150px; background-color: blue;">1</div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div style="height: 200px; background-color: aquamarine;">1</div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="4">
                <div class="box">1</div>
            </el-col>
            <el-col :span="5">
                <div class="box">2</div>
            </el-col>
            <el-col :span="6">
                <div class="box">3</div>
            </el-col>
            <el-col :span="5">
                <div class="box">4</div>
            </el-col>
            <el-col :span="4">
                <div class="box">
                    <BYQX></BYQX>
                </div>
            </el-col>
        </el-row>
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
</style>