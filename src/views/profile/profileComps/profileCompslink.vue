<template>
    <div class="link">
        <div class="link-item" v-for="(item,index) in wodedata" :key="index">
            <div class="linklogo">
                <img :src="item.wosvg" alt="">
            </div>
            <p>{{item.wotitle}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'profileCompslink',
    props:{
        wodedata:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style scoped>
.link{
    border-top: 12px solid #f2f2f2;
}
.link-item{
    display: flex;
    height: 45px;
    font-size: 16px;
    align-items: center;
}
.linklogo{
    height: 45px;
    width: 45px;
    padding: 12px;
    box-sizing: border-box;
}
.linklogo img{
    width: 100%;
}
.link-item p{
    display: inline-block;
    line-height: 45px;
    border-bottom: 1px solid #eee;
    width: 100%;
}

</style>