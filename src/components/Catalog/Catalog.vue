<template>
  <div class="products">
    <Loader v-if="Loader && catalogArray.length == 0"/>
    <out-product
        v-else-if="catalogArray.length"
        v-for="item in catalogArray"
        :key="item.id"
        :item="item"
        @add-carts="addCarts(item)"
        @remove-carts="removeCarts(item)"
        @open-product="openProduct(item)"
    />

    <div class="products__empty" v-else>
      <img src="../../assets/cart.png" alt="" class="products__empty-image">
      <p class="products__empty-text">В данной категории товаров пока нет</p>
    </div>
    <product-open
        v-if="product !=0"
        :product="product"
        @closeProduct="closeProduct"
    />
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Loader from '@/components/Loader/Loader'
import productOpen from '@/components/Catalog/product'
import vButton from '@/components/elements/button'
import OutProduct from "@/components/Catalog/outProduct";

export default {
  props: ['id'],
  data() {
    return {
      Loader: true,
      product: 0,
      catalogArray: [],
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
      this.product = 0
      if (!this.Loader) this.Loader = true
      this.catalogArray = []
      this.catalogArray = await this.catalog.filter(el => el.parent_id == this.id)
      if (this.Loader) this.Loader = false
    },
  },
  async mounted() {
    this.catalogArray = await this.catalog.filter(el => el.parent_id == this.id)
    this.Loader = false
  },
  components: {
    OutProduct,
    Loader, productOpen, vButton
  }
}
</script>
<style lang="scss" src="./style/catalog.scss"/>
