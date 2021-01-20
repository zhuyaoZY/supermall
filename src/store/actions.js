import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutaions-type'
export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //1.查找之前数组中是否有该商品
            //find方法返回满足提供的测试函数的数组中第一个元素的值
            let oldProduct = context.state.cartList.find((item => item.iid === payload.iid))
                //2.判断oldProduct
            if (oldProduct) {
                //添加一个count属性代表商品数量
                //如果这个商品存在就+1
                context.commit('ADD_COUNTER', oldProduct);
                resolve('当前商品数量+1');
            } else {
                //如果之前没有这个商品则count=1
                payload.count = 1
                payload.checked = true
                    //再将传过来的数据添加到carList数组里
                context.commit('ADD_TO_CART', payload)
                resolve('当前添加了新商品');
            }
        })
    }
}