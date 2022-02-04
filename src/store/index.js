import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart/'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        parent: [],
        children: [],
        catalog: [],
        reviews: []
    },
    mutations: {
        upadteData(state, allData) {
            const parents = allData.filter(el => el.parent_id === -1)
            const childrens = []
            const catalog = []
            parents.forEach(parent => {
                allData.forEach(data => {
                    if (parent.id == data.parent_id) {
                        childrens.push(data)
                    }
                })
            })
            childrens.forEach(children => {
                allData.forEach(data => {
                    if (children.id == data.parent_id) {
                        catalog.push(data)
                    }
                })
            })
            state.reviews.forEach(review => {
                state.catalog.forEach(product => {
                    if (review.id == product.id) {
                        product.reviews.push(review)
                    }
                })
            })
            if (localStorage.getItem('Cart')) {
                let cart = JSON.parse(localStorage.getItem('Cart'));
                cart = cart.filter(el => el)
                cart.forEach(product => {
                    catalog.forEach(catalog_product => {
                        if (product.id == catalog_product.id) catalog_product.completed = true
                    })
                })
                catalog.forEach(product => {
                    if (!product.completed) {
                        product.completed = false
                    }
                })
            } else {
                catalog.forEach(product => {
                    product['completed'] = false
                })
            }
            state.parent = parents
            state.children = childrens
            state.catalog = catalog
        },
        async addReview(state, review) {
            const product = state.catalog.filter(el => el.id == review.id)
            state.reviews.push(review)
        }
    },
    actions: {
        async fetchData(ctx) {
            let allData = []
            await fetch('http://test1.web-gu.ru/')
                .then(response => response.json())
                .then(json => {
                    allData = json
                })
            ctx.commit('upadteData', allData)
        },
        addReview(ctx, data) {
            console.log(data)
           ctx.commit('addReview', data)
        }
    },
    getters: {
        parent(state) {
            return state.parent
        },
        children(state) {
            return state.children
        },
        catalog(state) {
            return state.catalog
        }

    },
    modules: {
        cart
    }
})
