<template>
  <div class="cartbutton">
      <div class="left">
          <check-button :isChecked="isSelectAll" class="check-button" @click.native="isClick"/>
          <span>全选</span>
      </div>
      <div class="center">
          合计：￥{{totalPrice}}
      </div>
      <div class="right" @click="showClick">
          结算:({{totallength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/common/checkbutton/CheckButton'
export default {
    name:'CartBottom',
    components:{
        CheckButton,
    },
    computed:{
        totalPrice(){
            //filter筛选满足条件的数组
            return this.$store.state.cartList.filter(item=>{
                return item.checked
                //reduce对数组进行求和
            }).reduce((preValue,item)=>{
                return preValue+item.price*item.count
                //toFixed保留两位小数
            },0).toFixed(2)
        },
        totallength(){
            return this.$store.state.cartList.filter(item=>{return item.checked}).length
        },
        isSelectAll(){
            // 自己写
            if(this.$store.state.cartList.length==0){
                return false
            }else{
               return this.$store.state.cartList.filter(item=>{return item.checked}).length==this.$store.state.cartList.length
            }
            //老师写
            //1.使用filter
            // return !(this.$store.state.cartList.filter(item=>!item.checked).length)
            //2.使用find
            // return !this.$store.state.cartList.find(item=>!item.checked)
            //3.普通遍历
        //   for(let item of this.$store.state.cartList){
        //       if(!item.checked){
        //           return false
        //       }
        //   }
        //   return true
        }
    },
    methods:{
        isClick(){
            if(this.isSelectAll){
                //如果点击时全部是选中的话，点击后就全部切换成不选中的
                this.$store.state.cartList.forEach(element => {
                    element.checked=false
                });
            }else{
                 this.$store.state.cartList.forEach(element => {
                    element.checked=true
                });
            }
        },
        showClick(){
            this.$emit('showClick',this.isSelectAll)
        }
    }
}
</script>

<style scoped>
.cartbutton{
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    /* background-color: red; */
    position: absolute;
    bottom: 49px;
    align-items: center;
    text-align: center;
    font-size: 14px;
}
.left{
    width: 70px;
    height: 40px;
    margin-right: 10px;
    display: flex;
    align-items: center;
}

.center{
    flex: 1;
    text-align: left;
}
.check-button{
    width: 20px;
    height: 20px;
    margin: 4px;
}
.right{
    width: 80px;
    height: 40px;
    background-color: red;
    color: #fff;
}
</style>