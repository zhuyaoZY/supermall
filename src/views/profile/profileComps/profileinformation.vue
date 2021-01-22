<template>
    <div class="information">
        <div class="item">
            <span>00.0</span>元
            <p>我的余额</p>
        </div>
        <div class="item">
            <span>00.0</span>元
            <p>我的余额</p>
        </div>
        <div class="item">
            <span>00.0</span>元
            <p>我的余额</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'profileinformation'
}
</script>

<style scoped>
.information{
    display: flex;
    height: 83px;
    text-align: center;
    font-size: 14px;
}
.item{
    flex: 1;
    height: 100%;
    border-right: 2px solid #eee;
    align-items: center;
    padding-top: 20px;
}
.item:nth-last-child(1){
    border: 0;
}
.information span{
    color: red;
    font-weight: 700;
    font-size: 18px;
    
}
</style>