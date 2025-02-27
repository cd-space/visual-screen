<template>
    <div class="head">
        <div style="display: flex; justify-content: center; align-items: flex-end;flex: 2;">
            <img src="/src/assets/images/xiaohui.png" alt="校徽" class="badge-img">
            <img src="/src/assets/images/yuanhui.png" alt="院徽" class="badge-img" style="margin-left: 10px;">
        </div>
        <div style="display: flex; flex: 2;justify-content: center; align-items: center;">
            <span class="title-text">“千名学子百企行”就业实践活动</span>
        </div>
        <div style="display: flex; flex: 2;align-items: flex-end;justify-content:center;">
            <Time class="time"></Time>
        </div>
    </div>
</template>

<script setup>
import Time from './components/Time.vue'


</script>

<style scoped>
.head{
    width: 100vw;
    height: 7vh;
    display: flex;
}
.badge-img {
  max-width: 60%; 
  max-height: 60%; 
  object-fit: contain; 
  margin-bottom: 5px;
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
    font-size: 1.8vw;
    color: white;
    margin-bottom: 10px;
}


</style>