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
    width: 100vw;
    height: 100vh;
    background-image: url('/src/assets/images/bg-main.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}


.test-title {
    width: 100vw;
    height: 7vh;
}

.test-content {
    width: 96vw;
    height: 90vh;
    margin: 0 auto;
    padding-left: 6px;

}

</style>