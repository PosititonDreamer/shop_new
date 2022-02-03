import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart/'
import product from "@/components/Catalog/product";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    parent: [],
    children: [],
    catalog: []
  },
  mutations: {
    async upadteData(state, allData) {
        const parents = await allData.filter(el=>el.parent_id === -1)
        const childrens = []
        const catalog = []
        await parents.forEach(parent => {
            allData.forEach(data => {
                if(parent.id == data.parent_id) {
                   childrens.push(data)
                }
            })
        })
        await childrens.forEach(children => {
            allData.forEach(data => {
                if(children.id == data.parent_id) {
                    catalog.push(data)
                }
            })
        })
        if(localStorage.getItem('Cart')) {
            let cart = JSON.parse(localStorage.getItem('Cart'));
            cart = cart.filter(el=>el)
            await cart.forEach(product => {
                catalog.forEach(catalog_product => {
                    if(product.id == catalog_product.id) catalog_product.completed = true
                })
            })
            catalog.forEach(product => {
                if(!product.completed) {
                    product.completed = false
                }
            })
        }
        else {
            catalog.forEach(product=> {
                product['completed'] = false
            })
        }
        state.parent = parents
        state.children = childrens
        state.catalog = catalog
    },
    updateParent(state, data) {
      state.parent = data
    },
    updateChildren(state, data) {
      state.children = data
    },
    updateCatalog(state, data) {
      state.catalog = data
    }
  },
  actions: {
    async fetchData(ctx) {
        var allData = []
        await fetch('http://test1.web-gu.ru/')
            .then(response => response.json())
            .then(json => {  allData = json })
        ctx.commit('upadteData', allData)
        },
      addReview(ctx, data) {
          
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
