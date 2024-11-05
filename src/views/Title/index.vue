<script setup>

</script>

<template>
    <div class="head">
        <div class="box box1">
            <div class="pic-xiaohui">
                <img src="/src/assets/images/xiaohui.png" alt="校徽">
            </div>
            <div class="pic-yuanhui">
                <img src="/src/assets/images/yuanhui.png" alt="院徽">
            </div>
        </div>
        <div class="box box2">Box 2</div>
        <div class="box box3">Box 3</div>
    </div>
</template>

<style>
.head {
    width: 100%;
    height: 100%;
    display: flex;
}

.box {
    height: 100%;
    /* text-align: center; */
    color: white;
    line-height: 100px;
}

.box1 {
    /* background-color: rgba(255, 0, 0, 0.5); */
    flex: 2;
}

.box2 {
    background-color: rgba(0, 255, 0, 0.3);
    flex: 3;
    text-align: center;
}

.box3 {
    background-color: rgba(0, 0, 255, 0.7);
    flex: 2;
}
.box img {
      width: 30%; 
      height: 30%;  
      object-fit: contain;  
      
}

.pic-xiaohui{
    width: 14%;
    height: 14%;
    position: absolute;
    top: 19px;
    left: 110px;
}
.pic-yuanhui{
    width: 14%;
    height: 14%;
    position: absolute;
    top: 19px;
    left: 170px;
}
</style>