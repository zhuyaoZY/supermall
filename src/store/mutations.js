import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutaions-type'
export default {
    ADD_COUNTER(state, payload) {
        payload.count++
    },
    ADD_TO_CART(state, payload) {
        state.cartList.push(payload)
    },
    //
    ischecked(state, payload) {
        payload.checked = !payload.checked
    }
}