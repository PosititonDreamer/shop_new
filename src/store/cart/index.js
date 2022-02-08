export default {
    state: {
        cart: []
    },
    mutations: {
        updateCart(state, id) {
            state.cart = id
        },
        addCart(state, id) {
            state.cart.push(id)
            localStorage.setItem('Cart', JSON.stringify(state.cart))
        },
        removeCart(state, id) {
            state.cart = state.cart.filter(el => el.id != id.id)
            localStorage.setItem('Cart', JSON.stringify(state.cart))
        },
        sendOrder(state, data) {
            if (localStorage.getItem('orders')) {
                var order = {'number': data.number, 'adress': data.adress, 'name': data.name, 'products': state.cart}
                var orders = JSON.parse(localStorage.getItem('orders'));
                orders.push(order)
                localStorage.setItem('orders', JSON.stringify(orders));
                localStorage.removeItem('Cart')
            } else {
                var order = [{'number': data.number, 'adress': data.adress, 'name': data.name, 'products': state.cart}]
                localStorage.setItem('orders', JSON.stringify(order));
                localStorage.removeItem('Cart')
            }

        }
    },
    actions: {
        fetchCart(ctx) {
            if (localStorage.getItem('Cart')) ctx.commit('updateCart', JSON.parse(localStorage.getItem('Cart')))
            else {
                ctx.commit('updateCart', [])
            }
        },
        addCart(ctx, id) {
            ctx.commit('addCart', id)
        },
        removeCart(ctx, id) {
            ctx.commit('removeCart', id)
        },
        sendOrder(ctx, data) {
            ctx.commit('sendOrder', data)
        }
    },
    getters: {
        cart(state) {
            // console.log(state.cart)
            return state.cart.filter(el => el)
        },
        cartLength(state) {
            return state.cart.filter(el => el).length
        }
    },

}