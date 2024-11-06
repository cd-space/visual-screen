<script setup>
import Content from '../Content/index.vue'
import Title from '../Title/index.vue'
</script>

<template>
    <div class="box_main">
        <div class="test-title">
            <Title></Title>
        </div>
        <div class="test-content">
            <Content></Content>
        </div>
    </div>
</template>
<style scoped>
.box_main {       
    width: 100%;              
    height: 100%;            
    box-sizing: border-box; 
    background-image: url('/src/assets/images/bg-main.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;   
}


 .test-title {
    width: 100%;          
    height: 7vh;         
    /* background-color: black;  */
}
.test-content {
    width: 100%;          
    height: 93vh;         
    /* background-color: red;  */
}

</style>