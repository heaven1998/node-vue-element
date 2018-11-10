<template>
    <div class="home">
        <div class="container">
            <h1 class="title">怡茶在线</h1>
            <p class="lead"> 怡茶网-精选全国优质茶叶,中国领先专业的综合品质茶城！ </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
        background: url(../assets/img/bg.jpg) no-repeat;
        background-size: 100% 100%;
    }
    .container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 100px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        color: white;
    }
    .title {
        font-size: 30px;
    }
    .lead {
        margin-top: 50px;
        font-size: 22px;
    }
</style>