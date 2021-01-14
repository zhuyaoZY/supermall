<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        // 1.创建BScroll对象
            this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        // 2.监听滚动的位置
        if(this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(event)=>{
            this.$emit('scroll',event)
        })
        }
        // 3.监听上拉加载事件
        if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })
        }
    },
    methods:{
        //回到顶部
        scrollTo(x,y,time=500){
            this.scroll&&this.scroll.scrollTo&&this.scroll.scrollTo(x,y,time)
        },
        //能够再次触发上拉刷新
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        //重新检测滚动高度
        refresh(){
            console.log("----");
            this.scroll&&this.scroll.refresh()
        },
        //获取距离顶部的高度
        getScrollY(){
            return this.scroll?this.scroll.y:0
        }
        
    }
}
</script>

<style scoped>

</style>