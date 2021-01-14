import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('../views/home/Home.vue')
const Category = () =>
    import ('../views/category/Category.vue')
const Cart = () =>
    import ('../views/cart/Cart.vue')
const Profile = () =>
    import ('../views/profile/Profile.vue')
const Detail = () =>
    import ('../views/detail/Detail.vue')

Vue.use(VueRouter)
    // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

// 2.创建router
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]

const router = new VueRouter({
    routes
})

export default router