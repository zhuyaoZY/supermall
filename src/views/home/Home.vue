<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="taboffset2" class="tabcontrol" :titles="['流行','新款','精选']" @tabClick='tabClick' v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" @scroll="scrollTop" :probe-type="3" @pullingUp="LoadMoed" :pull-up-load='true' >
      <home-swiper class="home-swiper" :banners='banners' @imgLoad="imgLoad"></home-swiper>
      <home-recommended :recommends='recommends'></home-recommended>
      <home-popular></home-popular>
      <tab-control ref="taboffset1" :titles="['流行','新款','精选']" @tabClick='tabClick'/>
      <goods-list :goods='showGoods'/>
    </scroll>
    <back-top @click.native="backtop" v-show="isshow"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommended from './childComps/HomeRecommended'
import HomePopular from './childComps/HomePopular'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
//混入
import {itemListenerMixin} from 'common/mixin'
  export default {
    // mixins:[itemListenerMixin],
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommended,
      HomePopular,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        crenteIndex:'pop',
        isshow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        scrollY:0
      }
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
     
    },
    mounted(){
      const refresh=debounce(this.$refs.scroll.refresh,50)
       //接收事件总线里的监听item中图片加载完成
      this.$bus.$on('homeitemImgeLoad',()=>{
        //重新检测图片加载后的滚动高度
        refresh()
      })
    },
    computed:{
      showGoods(){
        return this.goods[this.crenteIndex].list
      }
    },
    //页面销毁时触发
    destroyed(){
        console.log('home 销毁');
    },
    //进入页面时触发
    activated(){
      //将scroll滚动到离开时的距离
      console.log(this.scrollY);
        this.$refs.scroll.scrollTo(0,this.scrollY,0)
        //进入页面之后最好刷新一次从新检测高度
        this.$refs.scroll.refresh()
    },
    //离开页面时触发
    deactivated(){
      //保存scroll距离顶部的距离
        this.scrollY= this.$refs.scroll.getScrollY()
    },
    methods:{
      // 事件监听相关方法
      tabClick(index){
        switch (index) {
          case 0:
            this.crenteIndex='pop'
            break;
          case 1:
            this.crenteIndex='new'
            break;
          case 2:
            this.crenteIndex='sell'
            break;
        }
        this.$refs.taboffset1.controlIndex=index
        this.$refs.taboffset2.controlIndex=index
      },
      backtop(){
          this.$refs.scroll.scrollTo(0,0)
      },
      //监听滚动事件
      scrollTop(event){
        (event.y)<-1000?this.isshow=true:this.isshow=false
        this.isTabFixed=(event.y)<=-this.tabOffsetTop
      },
      LoadMoed(){
        this.getHomeGoods(this.crenteIndex)

        this.$refs.scroll.scroll.refresh()
      },
      //轮播图片加载完后获取导航距离顶部的距离
      imgLoad(){
        this.tabOffsetTop=this.$refs.taboffset1.$el.offsetTop;
        console.log(this.tabOffsetTop);
      },
      // 网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
          console.log(this.banners);
          console.log(this.recommends);
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
#home{
  position: relative;
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  z-index: 2;
}
.home-swiper{
  /* padding-top: 44px; */
}
.tabcontrol{
  position: relative;
  top: 44px;
  z-index: 2;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
