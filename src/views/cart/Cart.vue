<template>
<div class="car-list">
  <nav-bar class="navbar">
    <div slot="center">购物车({{this.length}})</div>
  </nav-bar>
   <scroll ref="scroll" class="content" :probeType="3">
        <cart-list/>
    </scroll>
    <cart-bottom>

    </cart-bottom>
  </div>
</template>

<script>
//导入navbar组件
import NavBar from 'components/common/navbar/NavBar'
//导入scroll组件
import Scroll from 'components/common/scroll/Scroll'
//导入CartList组件
import CartList from './cartComps/CartList'
//
import CartBottom from './cartComps/CartBottom'
import {mapGetters} from 'vuex'




  export default {
    name: "Cart",
    components:{
      NavBar,
      Scroll,
      CartList,
      CartBottom,


    },
    computed:{
   ...mapGetters({
        length:'CartLength',
      }),
    },
    //进入页面时触发
    activated(){
      this.$refs.scroll.refresh()
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
