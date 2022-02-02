import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart/'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    parent: [],
    children: [],
    catalog: []
  },
  mutations: {
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
        const res = await fetch(' http://test1.web-gu.ru/');
        const allData = await res.json();
        const parent = await allData.filter(el=>el.parent_id === -1)
        const children = []
        const catalog = []
        await parent.forEach(item=>{
            children[ item['id']] = allData.filter(el=>el.parent_id === item['id'])
        })
        await children.forEach(item=> {
            item.forEach(childrenitem=> {
                catalog[ childrenitem['id']] = allData.filter(el=>el.parent_id === childrenitem['id'])
            })
        })
        if(localStorage.getItem('Catalog')) {
            let cart = JSON.parse(localStorage.getItem('Catalog'));
            await catalog.forEach(item=> {
                item.forEach(childrenitem=> {
                    if(cart[childrenitem['id']]!= null) { childrenitem['completed'] = true  }
                    else { childrenitem['completed'] = false }
                })
            })
        }
        else {
            await catalog.forEach(item=> {
                item.forEach(childrenitem=> {
                    childrenitem['completed'] = false
                })
            })
        }
        if(localStorage.getItem('reviews')) {
          let reviews = JSON.parse(localStorage.getItem('reviews'));
          await catalog.forEach(item=> {
            item.forEach(childrenitem=> {
                reviews.forEach(revitem=> {
                    if(childrenitem['id'] == revitem['id']) {
                        childrenitem['reviews'].push(revitem)
                    }
                })
            })
          })
        }
        ctx.commit('updateParent', parent)
        ctx.commit('updateChildren', children)
        ctx.commit('updateCatalog', catalog)
        },
      addReview(ctx, data) {
          if(localStorage.getItem('reviews')) {
              var review = {'text': data.text, 'author': data.author, 'rate':data.rate, 'id': data.id}
              var reviews = JSON.parse(localStorage.getItem('reviews'));
              reviews.push(review)
              localStorage.setItem('reviews',JSON.stringify(reviews));
          }else {
              var review = [{'text': data.text, 'author': data.author, 'rate':data.rate, 'id': data.id}]
              localStorage.setItem('reviews',JSON.stringify(review));
          }

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
