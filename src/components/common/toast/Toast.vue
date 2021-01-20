<template>
  <div class="toast" v-show="ishow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    name:'Toast',
    props:{
        message:{
            type:String,
            default:'哈哈哈'
        },
        ishow:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 0 10px;
    transform: translate(-50%,-50%);
    line-height: 30px;
    font-size: 14px;
    background-color: rgba(0,0,0,.7);
    color: #fff;
    border-radius: 4px;
    z-index: 3;
}
</style>