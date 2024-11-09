<script setup>
import CFLC from '@/views/Content/components/cflc.vue'
import CYRS from '@/views/Content/components/cyrs.vue'
import ZYNJFB from '@/views/Content/components/zynjfb.vue'
</script>

<template>
    <div class="content">


        <el-row :gutter="20">
            <el-col :span="4">
                <div class="box">
                    1
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
                    5
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