<template>
  <header class="header">
    <div class="logo">
      <img alt="Vue logo" src="../../assets/logo.png" class="logo__image">
      <p class="logo__title">SHOP</p>
    </div>
    <div class="header__right">
      <nav class="menu">
        <ul class="menu__list">
          <li v-for="item in parent" :key="item.id" class="menu__item">
            <router-link :to="{path: '/CurrentCategory/'+item.id, props:{id: item.id}}" tag="a" class="menu__link">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
      <v-button
          :class="'cart'"
          @click="takeCart()"
      >
        <img src="../../assets/cart.png" alt="" class="cart__image">
        <p class="cart__length">{{ cartLength }}</p>
      </v-button>
    </div>
    <cart v-if="open"
          @takeCart="takeCart"
    />
  </header>
</template>
<script>
import {mapGetters} from "vuex"
import cart from "@/components/cart/cart"
import vButton from "@/components/elements/button"

export default {
  data() {
    return {
      open: false,
    }
  },
  computed: mapGetters(['parent', 'cartLength']),
  methods: {
    takeCart() {
      this.open = !this.open
    }
  },
  components: {
    cart, vButton
  }
}
</script>
<style lang="scss" src="./style.scss" scoped/>