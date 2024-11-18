<template>
    <el-row class="head">
        <el-col :span="8">
            <el-row justify="center" >
                <el-col :span="3" :offset="3" class="image-col">
                    <img src="/src/assets/images/xiaohui.png" alt="校徽" class="badge-img">
                </el-col>
                <el-col :span="3" class="image-col">
                    <img src="/src/assets/images/yuanhui.png" alt="院徽" class="badge-img">
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="8" class="title">
            <span class="title-text">“千名学子百企行”就业实践活动</span>
        </el-col>
        <el-col :span="8">
            <Time class="time"></Time>
        </el-col>
    </el-row>
</template>

<script setup>
import Time from './components/Time.vue'
import Time1 from './components/Time1.vue'


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
.title {
    color: white;
    font-size: 40px;
    font-weight: bold;

    margin-top:-9px ;
}
.image-col{
    margin-top:9px ;
}
.title-text{
    margin-left: 80px;
}
.time{
    margin-left: 85px;
    margin-top:28px ;
}

</style>