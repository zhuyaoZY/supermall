<template>
    <div class="tab-control">
        <div class="tab-item" :class="{active:index===controlIndex}" v-for="(item,index) in titles" :key="index" @click="ControlChange(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
                type:Array,
                default(){
                    return []
                }
            }
    },
    data(){
        return{
            controlIndex:0
        }
    },
    methods:{
        ControlChange(index){
            this.controlIndex=index
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style  scoped>
.tab-control{
    display: flex;
    text-align: center;
    background-color: #fff;
}
.tab-item{
    flex: 1;
    
}
.tab-item span{
    padding: 5px;
    font-size: 15px;
    line-height: 40px;
    height: 40px;
}
.active{
    color:var(--color-high-text);
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
</style>