import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1.安装插件
Vue.use(Vuex)
    //2.创建对象
const store = new Vuex.Store({
    //存放基本数据
    state: {
        cartList: []
    },
    //继续封装的actions和mutaions
    mutations,
    actions,
    //getters就相当于计算属性
    getters,


})
export default store