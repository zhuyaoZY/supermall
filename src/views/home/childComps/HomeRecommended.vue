<template>
    <div class="recommend">
        <div class="item-recommend" v-for="(item,index) in recommends" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <p>{{item.title}}</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:'HomeRecommended',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .recommend{
        display: flex;
        width: 100%;
        padding: 10px 0px 20px;
        border-bottom: 8px solid #eee;
    }
    .item-recommend{
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .item-recommend img{
        width: 65px;
        height: 65px;
        margin-bottom: 10px;
    }
</style>