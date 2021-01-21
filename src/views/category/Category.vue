<template>
  <div class="category">
    <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>
     <scroll class="content1" ref="scroll1" :probeType="3">
         <categorytitle :categorylist="categorylist" @isClick="isClick"/>
     </scroll>
     <scroll class="content2" ref="scroll2" :probeType="3">
          <categorydetailed :Subcategory="Subcategory"/>
          <tab-control class="control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
          <goods-list :goods="showGoods"/>
    </scroll>
  </div>
</template>

<script>
//引入顶部栏组件
import NavBar from 'components/common/navbar/NavBar'
//引入侧边栏标题
import categorytitle from './categoryComps/categorytitle'
//引入滚动插件
import Scroll from 'components/common/scroll/Scroll'
//引入详情分类
import categorydetailed from './categoryComps/categorydetailed'
//引入TabControl
import TabControl from 'components/content/tabControl/TabControl'
//引入Goodslist
import GoodsList from 'components/content/goods/GoodsList'

//获取分类数据的请求方法
import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
//引入防抖
import {debounce} from 'common/utils'



  export default {
    name: "Category",
    data(){
      return{
        //分类数据
        categorylist:[],
        //详细数据
        Subcategory:[],
        //
        crentIndex:0,
        //底部分类数据
        goods:{
          'pop':{list:[]},
          'sell':{list:[]},
          'new':{list:[]},
        },
        //默认选中
        titlIndex:'pop'
      }
    },
    //计算属性
    computed:{
        showGoods(){
          return this.goods[this.titlIndex].list
        }
    },
    components:{
      NavBar,
      categorytitle,
      categorydetailed,
      TabControl,
      GoodsList,
      Scroll
    },
    created(){
      this.getCategory()
    },
    methods:{
      //获取分类列表
      getCategory(){
        getCategory().then(res=>{
          console.log(res);
          this.categorylist=res.data.category.list
          console.log(this.categorylist);

          //获取详细信息,要先获取到分类列表
        this.getSubcategoryy(0);
        })
      },
      //点击获取详细信息数据
      isClick(index){
          this.getSubcategoryy(index)
          this.$refs.scroll2.scrollTo(0,0,0)
      },
      getSubcategoryy(index){
        this.crentIndex=index;
        const maitKey=this.categorylist[index].maitKey
        getSubcategory(maitKey).then(res=>{
          console.log(res);
          this.Subcategory=res.data.list
          console.log(this.Subcategory);
          //调用获取底部数据
          this.getCategoryDetail('pop')
          this.getCategoryDetail('sell')
          this.getCategoryDetail('new')
        })
      },
      //获取底部分类数据
      getCategoryDetail(type){
          const miniWallkey=this.categorylist[this.crentIndex].miniWallkey
          getCategoryDetail(miniWallkey,type).then(res=>{
            console.log(res);
            this.goods[type].list=res
          })
      },
      //点击切换
        tabClick(index){
          switch (index) {
            case 0:
              this.titlIndex='pop'
              break;
          
            case 1:
              this.titlIndex='sell'
              break;

            case 2:
              this.titlIndex='new'
              break;
          }
          
      }
    },

    
    
    mounted(){
      const refresh=debounce(this.$refs.scroll2.refresh,50)
      //获取事件总线里的图片加载事件
      this.$bus.$on('categorydetailedimgLoad',()=>{
        refresh()
      })
      this.$bus.$on('categoryImgeLoad',()=>{
        refresh()
      })
    },
    updated(){
        this.$nextTick(()=>{
        this.$refs.scroll1.refresh()
        this.$refs.scroll2.refresh()
      })
    }
  }
</script>

<style scoped>
.content1{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    background-color: #f6f6f6;
}
.content2{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 100px;
    right: 0px;
    background-color: #fff;
}
.category-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  z-index: 2;
}
.control{
  width: 100%;
}
.control .item{
  width: 33%;
}
</style>
