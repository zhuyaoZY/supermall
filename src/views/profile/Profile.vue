<template>
   <div>
     <nav-bar class="profile"><div slot="center">小朱购物</div></nav-bar>
     <div class="pro">
        <profilepersonal/>
        <profileinformation/>
        <profileCompslink :wodedata="xiaoxidata"/>
        <profileCompslink :wodedata="xiazaidata"/>
      </div>
   </div>
</template>

<script>
//引入顶部栏
import NavBar from 'components/common/navbar/NavBar'
//引入个人信息
import profilepersonal from './profileComps/profilepersonal'
//引入数据栏
import profileinformation from './profileComps/profileinformation'
//引入链接
import profileCompslink from './profileComps/profileCompslink'
  export default {
    name: "Profile",
    data(){
      return{
        xiaoxidata:[
         {wosvg:require('../../assets/svg/xiaoxi.svg'),wotitle:'我的信息'},
         {wosvg:require('../../assets/svg/icon-test.svg'),wotitle:'积分商城'},
         {wosvg:require('../../assets/svg/huiyuanqiagoumai.svg'),wotitle:'会员卡'}
        ],
        xiazaidata:[
          {wosvg:require('../../assets/svg/gouwuche.svg'),wotitle:'我的购物车'},
          {wosvg:require('../../assets/svg/xiazai.svg'),wotitle:'下载购物app'},
        ]
      }
    },
    components:{
      NavBar,
      profilepersonal,
      profileinformation,
      profileCompslink
    }
  }
</script>

<style scoped>
.pro{
  overflow: hidden;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.profile{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0px;
  z-index: 2;
}
</style>
