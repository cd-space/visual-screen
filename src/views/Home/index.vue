<script setup>
import Content from '../Content/index.vue'
import Title from '../Title/index.vue'
</script>

<template>

    <div class="box">
        <div class="parent ">
            <div class="test-title">
                <Title></Title>
            </div>
            <div class="test-content">
                <Content></Content>
            </div>
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
}

.parent {
    height: 100%; /* 使父元素占满整个视口高度 */
}

/* .test-title {
    width: 100%;          
    height: 12%;         
    background-color: black; 
}
.test-content {
    width: 100%;          
    height: 88%;         
    background-color: red; 
} */

</style>