<template>
  <div id="app">
    <!-- keep-alive禁止页面被销毁 exclude可以销毁的页面 -->
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
