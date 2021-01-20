import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入fastclick 
import FastClick from 'fastclick'
//引入lib-flexible
import 'lib-flexible'
//引入懒加载
import VuelazyLoad from 'vue-lazyload'
// Vue.use(VuelazyLoad)
Vue.use(VuelazyLoad, {
    loading: require('./assets/img/common/placeholder.png'),
})
Vue.config.productionTip = false
    //使用fastclick解决300毫秒延迟
FastClick.attach(document.body)

//新建一个事件总线new一个vue实例
Vue.prototype.$bus = new Vue()
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')