<template>
    <div class="head">
        <div class="box box1">
            <el-row :gutter="20" justify="center">
                <el-col :span="3" :offset="6" class="badge-col">

                    <img src="/src/assets/images/xiaohui.png" alt="校徽">

                </el-col>
                <el-col :span="3" class="badge-col">

                    <img src="/src/assets/images/yuanhui.png" alt="院徽">

                </el-col>
            </el-row>
        </div>
        <div class="box box2"><span class="title">“千名学子百企行”就业实践活动</span></div>
        <div class="box box3">
            <Time></Time>
        </div>
    </div>
</template>

<script setup>
import Time from './components/Time.vue'


</script>

<style scoped>
.head {
    width: 100vw;
    height: 7vh;
    display: flex;
}

.box {
    height: 7vh;
    width: 100vw;
    color: white;
    line-height: 100px;
}

.box1 {
    flex: 1;
    height: 7vh;
    display: flex;
    align-items: center;
}

.box2 {
    flex: 1;
    text-align: center;
}

.box3 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box img {
    width: 5vw;
    height: 5vh;
    object-fit: contain;

}

.el-row {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
}

.el-col {
    height: 68%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 40px;
    font-weight: bold;
    position: relative;
    top: -27px;
    /* 通过调整top的负值来让文字上移 */
}

.badge-col img {
    position: relative;
    top: -5px;
    /* 负值向上移动 */
}
</style>