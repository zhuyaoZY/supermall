<template>
     <div class="detailed">
         <div class="list-item" v-for="(item,index) in Subcategory" :key="index"> 
             <a :href="item.link">
                 <img :src="item.image" alt="" @load="imgLoad">
             </a>
             <p>{{item.title}}</p>
         </div>
     </div>
</template>

<script>
export default {
    name:'categorydetailed',
    props:{
        Subcategory:{
            type:Array,
            default:[]
        }
    },
    methods:{
        imgLoad(){
            this.$bus.$emit("categorydetailedimgLoad")
        }
    }
}
</script>

<style scoped>
.detailed{
    display: flex;
    flex-wrap: wrap;
}
.list-item{
    width: 33%;
    text-align: center;
    padding-bottom: 10px;
}
.list-item img{
    width: 100%;
    padding: 10px;
}
</style>