<template>
<div class="car-list">
    <nav-bar class="navbar">
      <div slot="center">购物车({{this.length}})</div>
    </nav-bar>
    <scroll ref="scroll" class="content" :probeType="3">
        <cart-list/>
    </scroll>
    <cart-bottom @showClick="showClick"/>
    <toast :message="message" :ishow="ishow"/>
  </div>
</template>

<script>
//导入navbar组件
import NavBar from 'components/common/navbar/NavBar'
//导入scroll组件
import Scroll from 'components/common/scroll/Scroll'
//导入CartList组件
import CartList from './cartComps/CartList'
//Toast弹框组件
import Toast from 'components/common/toast/Toast'
import CartBottom from './cartComps/CartBottom'
import {mapGetters} from 'vuex'
//引入防抖
import {debounce} from 'common/utils'



  export default {
    name: "Cart",
    data(){
      return {
        message:"",
        ishow:false,
        stopClickLogin:true
      }
    },
    components:{
      NavBar,
      Scroll,
      CartList,
      CartBottom,
      Toast

    },
    computed:{
   ...mapGetters({
        length:'CartLength',
        Cart:'CartList'
      }),
    },
    //进入页面时触发
    activated(){
      this.$refs.scroll.refresh()
    },
    mounted(){
    },
    methods:{
       showClick(){
         //使用节流防止用户点击多次
         let that=this
         if(that.stopClickLogin){
             if(that.length==0){
                that.message='请添加商品'
                that.ishow=true
              }else if(that.Cart.filter(item=>{return item.checked}).length==0){
                  that.message='请选中商品'
                  that.ishow=true
              }
              setTimeout(()=>{
                that.message=''
                  that.ishow=false
              },2000)
              that.stopClickLogin=false
               setTimeout(()=>{
                that.stopClickLogin=true
            },2000)
          }
       },
    }
  }
</script>

<style scoped>
.navbar{
  background-color:var(--color-tint);
  color: #fff;
}
.content{
  overflow: hidden;
  height: 100%px;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 89px;
}
</style>
