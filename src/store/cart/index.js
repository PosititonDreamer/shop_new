import catalog from "@/components/Catalog/Catalog";

export default {
    state: {
        cart: []
    },
    mutations: {
        updateCart(state, id) {
            state.cart = id
        },
        addCart(state, id) {
            state.cart[id.id] = id
            localStorage.setItem('Catalog', JSON.stringify(state.cart))
        },
        removeCart(state,id) {
            delete state.cart[id.id]
            localStorage.setItem('Catalog', JSON.stringify(state.cart))
        },
        sendOrder(state, data) {
            if(localStorage.getItem('orders')) {
                var order = {'number': data.number, 'adress': data.adress, 'name':data.name, 'products': state.cart}
                var orders = JSON.parse(localStorage.getItem('orders'));
                orders.push(order)
                localStorage.setItem('orders',JSON.stringify(orders));
                localStorage.removeItem('Catalog')
            }else {
                var order = [{'number': data.number, 'adress': data.adress, 'name':data.name, 'products': state.cart}]
                localStorage.setItem('orders',JSON.stringify(order));
                localStorage.removeItem('Catalog')
            }
            // console.log(localStorage.getItem('orders'))
        }
    },
    actions: {
        fetchCart(ctx) {
            if(localStorage.getItem('Catalog')) ctx.commit('updateCart', JSON.parse(localStorage.getItem('Catalog')))
            else {
                ctx.commit('updateCart', [])
            }
        },
        addCart(ctx,id) {
            ctx.commit('addCart', id)
        },
        removeCart(ctx,id) {
            ctx.commit('removeCart', id)
        },
        sendOrder(ctx, data) {
            ctx.commit('sendOrder', data)
        }
    },
    getters: {
        cart(state) {
            // console.log(state.cart)
            return state.cart.filter(el=>el)
        },
        cartLength(state) {
            return state.cart.filter(el=>el).length
        }
    },

}