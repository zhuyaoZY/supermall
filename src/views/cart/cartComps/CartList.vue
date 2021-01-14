<template>
    <div>
        <cart-list-item v-for="(item,index) in CartList" :key="index" :itemInfo="item"/>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem'
export default {
    name:'CartList',
    components:{
        CartListItem
    },
    computed:{
      ...mapGetters(['CartList']),
    }
}
</script>

<style scoped>

</style>