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
    background-color: #ADD8E6; 
    width: 100vw;              
    height: 100vh;            
    box-sizing: border-box;    
}

.test-title {
    width: 100%;          
    height: 12%;         
    background-color: black; 
}
.test-content {
    width: 100%;          
    height: 88%;         
    background-color: red; 
}

</style>