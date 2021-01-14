<template>
    <div id="detail">
        <detail-navbar ref="navbar" @itemClick="itemClick"/>
        <scroll class="content" ref="scroll" :probeType="3" @scroll="scrollgundong">
            <detail-swiper :topImages="this.topImages"/>
            <detail-base-info :goods="this.goods"/>
            <detail-shop-info :shop="this.shop" />
            <detail-goods-info class="goods" :detailInfo="this.detailInfo" @imgLoad="imgLoad"/>
            <detail-param-info ref="paramInfo" :paramInfo="this.detailParameter"/>
            <detail-comment-info ref="commentInfo" :commentInfo="this.commentInfo"/>
            <goods-list ref="list" :goods="this.recommends"/>
        </scroll>
         <detail-bottombar @barClick="barClick"/>
        <back-top class="backtop" @click.native="backtop" v-show="isshow"/>
    </div>
</template>

<script>
import detailNavbar from 'views/detail/detailComps/detailNavbar'
//引入根据iid发送请求和组件整理好的数据
import {getDtail,Goods,Shop,ParaMeter,getRecommend} from '../../network/detail'
//引入封装好的swiper轮播图
import detailSwiper from 'views/detail/detailComps/detailSwiper'
//引入商品信息组件
import detailBaseInfo from 'views/detail/detailComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/detailComps/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/detailComps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/detailComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/detailComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottombar from 'views/detail/detailComps/DetailBottombar'
//引入封装的滚动插件
import scroll from 'components/common/scroll/Scroll'
//引入防抖
import {debounce} from 'common/utils'
//混入
import {itemListenerMixin,backtop} from 'common/mixin'
import BackTop from 'components/content/backTop/BackTop'






export default {
    name:'Detail',
    // mixins:[itemListenerMixin],
    mixins:[backtop],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            detailParameter:{},
            commentInfo:{},
            recommends:[],
            offsetTopY:[],
            currentIndex:0
        }
    },
    components:{
        detailNavbar,
        detailSwiper,
        detailBaseInfo,
        DetailShopInfo,
        scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottombar,
        BackTop
    },
   
  created(){
      //保存传入的iid
      this.iid= this.$route.params.iid
      //根据iid发送请求详情页数据
      getDtail(this.iid).then(res=>{
          console.log(res);
          const data=res.result
          this.topImages=res.result.itemInfo.topImages
          //获取商品信息
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
          this.shop=new Shop(data.shopInfo)
          //保存商品详情信息
          this.detailInfo=data.detailInfo
          //获取商品参数信息
          this.detailParameter=new ParaMeter(data.itemParams.info, data.itemParams.rule)
          //获取商品评论数据
          if(data.rate.cRate!==0){
            this.commentInfo=data.rate.list[0]
            console.log(this.commentInfo);
          }
            //这里获取的数据可能不是图片加载后的数据
        //   this.$nextTick(()=>{
        //       this.offsetTopY=[]
        //       this.offsetTopY.push(0)
        //       this.offsetTopY.push(this.$refs.paramInfo.$el.offsetTop)
        //       this.offsetTopY.push(this.$refs.commentInfo.$el.offsetTop)
        //       this.offsetTopY.push(this.$refs.list.$el.offsetTop)
        //       console.log(this.offsetTopY);
        //   })
      })
      //获取详情页推荐数据
      getRecommend().then(res=>{
          this.recommends=res.data.list
          console.log(this.recommends);
      })
    },
    mounted(){
        const refresh=debounce(this.$refs.scroll.refresh,50)
       //接收事件总线里的监听item中图片加载完成
      this.$bus.$on('detailitemImgeLoad',()=>{
        //重新检测图片加载后的滚动高度
        refresh()
      })
    },
    methods:{
        imgLoad(){
            this.$refs.scroll.refresh()

            this.offsetTopY=[]
            this.offsetTopY.push(0)
            this.offsetTopY.push(this.$refs.paramInfo.$el.offsetTop)
            this.offsetTopY.push(this.$refs.commentInfo.$el.offsetTop)
            this.offsetTopY.push(this.$refs.list.$el.offsetTop)
            console.log(this.offsetTopY);
        },
        itemClick(index){
            this.$refs.scroll.scrollTo(0,-this.offsetTopY[index],100)
        },
        scrollgundong(event){
            //回到顶部
            (event.y)<-1000?this.isshow=true:this.isshow=false
          

            const posionY=-event.y

           let length=this.offsetTopY.length
           for(let i=0;i<length;i++){
               if(this.currentIndex!==i&&((i<length-1&&posionY>=this.offsetTopY[i]&&posionY<this.offsetTopY[i+1])||
               (i===length-1&&posionY>=this.offsetTopY[i]))){
                   this.currentIndex=i;
                   this.$refs.navbar.crentIndex=this.currentIndex
               }
           }
        //自己写死的数据
        //    if(posionY>0&&posionY<=this.offsetTopY[1]){
        //        this.$refs.navbar.crentIndex=0
        //    }else if(posionY>=this.offsetTopY[1]&&posionY<=this.offsetTopY[2]){
        //        this.$refs.navbar.crentIndex=1
        //    }else if(posionY>=this.offsetTopY[2]&&posionY<=this.offsetTopY[3]){
        //        this.$refs.navbar.crentIndex=2
        //    }else if(posionY>=this.offsetTopY[3]){
        //        this.$refs.navbar.crentIndex=3
        //    }
        },
        //点击添加购物车
        barClick(){
            //1.获取购物车需要展示的信息s
            const product={}
            product.image=this.topImages[0];
            product.title=this.goods.title;
            product.desc=this.goods.desc;
            product.price=this.goods.realPrice;
            product.iid=this.iid;

            //2.将商品添加到购物车里
            // console.log($store);

            //获取vuex里的actions方法
            this.$store.dispatch('addCart', product)
        }
    }
}
</script>

<style scoped>
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #fff;
}
.detail{
    position: relative;
}
.backtop{
    z-index: 2;
}
</style>