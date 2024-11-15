<template>
    <el-row class="head">
        <el-col :span="8">
            <el-row justify="center" align="bottom">
                <el-col :span="3" :offset="3" class="image-col">
                    <img src="/src/assets/images/xiaohui.png" alt="校徽" class="badge-img">
                </el-col>
                <el-col :span="3" class="badge-col">
                    <img src="/src/assets/images/yuanhui.png" alt="院徽" class="badge-img">
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="8">
            <span class="title">“千名学子百企行”就业实践活动</span>
        </el-col>
        <el-col :span="8">
            <Time></Time>
        </el-col>
    </el-row>
</template>

<script setup>
import Time from './components/Time.vue'


</script>

<style scoped>
.head{
    width: 100vw;
    height: 7vh;
}
.badge-img {
  width: 100%; 
  height: auto; 
  max-width: 57px; 
  max-height: 57px; 
  object-fit: contain; 
}

</style>