<template>
  <div class="products">
    <Loader v-if="Loader"/>
    <div v-else-if="catalog[this.id].length" class="products__item" v-for="item in catalog[this.id]" >
      <img :src="item.img" alt="" class="products__image" @click="openProduct(item)">
      <div class="products__item-description">
        <p class="products__name" @click="openProduct(item)">{{ item.name }}</p>
        <p class="products__price">{{ item.price }} ₽</p>
        <button @click="removeCarts(item)" v-if="item.completed" class="products__button">В корзине <img
            src="../../assets/accept.png" alt="" class="products__button-image"></button>
        <button @click="addCarts(item)" v-else class="products__button">Добавить в корзину</button>
      </div>
    </div>
    <div class="products__empty" v-else>
      <img src="../../assets/cart.png" alt="" class="products__empty-image">
      <p class="products__empty-text">В данной категории товаров пока нет</p>
    </div>
    <product-open
        v-if="product !=0"
        :product="product"
        v-on:closeProduct="closeProduct"
    />
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Loader from '@/components/Loader/Loader'
import productOpen from '@/components/Catalog/product'

export default {
  props: ['id'],
  data() {
    return {
      Loader: true,
      product: 0
    }
  },
  methods: {
    ...mapActions({
      addCart: 'addCart',
      removeCart: 'removeCart',
      fetchCart: 'fetchCart'
    }),
    removeCarts(id) {
      id.completed = !id.completed
      this.removeCart(id)
      this.fetchCart()
    },
    addCarts(id) {
      id.completed = !id.completed
      this.addCart(id)
      this.fetchCart()
    },
    openProduct(id) {
      this.product = id
    },
    closeProduct() {
      this.product = 0
    }
  },
  computed: mapGetters(['catalog']),
  watch: {
    async id() {
      if (this.Loader) this.Loader = true
      this.product = 0
      if (this.Loader) this.Loader = false
    },
  },
  async mounted() {
    this.fetchCart()
    if (0 < parseInt(this.id)) {
      this.Loader = false
    }
  },
  components: {
    Loader, productOpen
  }
}
</script>
<style lang="scss" src="./style/catalog.scss" scoped/>
