<template>
  <div>
        <ul class="item">
            <li v-for="(item,index) in categorylist" :key="index" :class="{active:index==liIndex}" @click="isClick(index)">{{item.title}}</li>
        </ul>
  </div>
</template>

<script>


export default {
    name:'CategoryTitile',
    data(){
        return{
            liIndex:0
        }
    },
    components:{
    },
    props:{
        categorylist:{
            type:Array,
            default:[]
        }
    },
    methods:{
        isClick(index){
            this.liIndex=index
            this.$emit('isClick',index)
        }
    }
}
</script>

<style scoped>
.item li{
    width: 100px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #f6f6f6;
}
.item .active{
    border-left: 3px solid pink;
    background-color: #fff;

}
</style>