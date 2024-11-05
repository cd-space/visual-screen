<script setup>
import Content from '../Content/index.vue'
import Title from '../Title/index.vue'
</script>

<template>
    <div class="box">
        <div class="test-title">
            <Title></Title>
        </div>
        <div class="test-content">
            <Content></Content>
        </div>
    </div>
</template>
<style>
.box {
    padding: 10px;            
    background-color: white; 
    width: 100%;              
    height: 100%;            
    box-sizing: border-box; 
    background-image: url('/src/assets/images/bg-main.png'); /* 背景图片 */
    background-size: cover;          /* 让背景图片覆盖整个区域 */
    background-position: center;      /* 背景图片居中显示 */   
}


 .test-title {
    width: 100%;          
    height: 7%;         
    /* background-color: black;  */
}
.test-content {
    width: 100%;          
    height: 93%;         
    /* background-color: red;  */
}

</style>