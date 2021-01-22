<template>
    <div class="personal">
        <div class="lg">
            <img src="~assets/svg/touxiang.svg" alt="">
        </div>
        <div class="denglu">
            <div>登陆/注册</div>
            <p>暂无绑定手机号</p>
        </div>
        <div class="jiantou">
            <img src="~assets/svg/jiantou.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:'profilepersonal'
}
</script>

<style scoped>
.personal{
    display: flex;
    margin-top: 44px;
    height: 120px;
    background-image:url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2290338763,1795964104&fm=26&gp=0.jpg');
    align-items: center;
    background-size: 100%;
}
.lg{
    width: 60px;
    height: 60px;
    margin-left: 20px;
    border-radius: 50%;
    overflow: hidden;
}
.lg img{
    width: 100%;
}
.denglu{
    margin-left: 10px;
    color: #fff;
}
.denglu div{
    font-size: 18px;
    margin-bottom: 6px;
}
.denglu p::before{
    content: '';
    display: inline-block;
    background-image: url('~assets/svg/shouji.svg');
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    
}
.jiantou{
    width: 20px;
    height: 30px;
    margin-left: 140px;
}
.jiantou img{
    width: 100%;
}
</style>