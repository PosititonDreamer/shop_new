<template>
  <div class="openCart">
    <div class="cart">
      <div class="cart__item">
        <p class="cart__item-info">Оформить заказ</p>
        <button class="cart__item-button" @click="$emit('takeCart')"><img src="../../assets/close.png" alt=""
                                                                          class="cart__item-close"></button>
      </div>
      <div class="order" v-if="!access && cartLength > 0">
        <p class="cart__text">В корзине: </p>
        <div class="cart__products">
          <div class="cart__products-item" v-if="cartLength > 0" v-for="item in cart" >
            <img :src="item.img" alt="" class="cart__products-image">
            <div class="cart__products-description">
              <p class="cart__products-name">{{ item.name }}</p>
              <p class="cart__products-price">{{ item.price }} ₽</p>
              <button class="cart__products-button" @click="removeCarts(item)"> Убрать из корзины</button>
            </div>
          </div>
        </div>
        <form class="cart__form" @submit.prevent="send_form">
          <div class="cart__form-blocks">
            <div class="cart__form-block">
              <p class="cart__form-text">Имя</p>
              <input type="text" v-model="name" class="cart__form-input" :class="{'cart__form-error': this.name_check}">
              <p class="error" :class="{'error-view': this.name_check}">Имя не должно быть пустым</p>
              <p></p>
            </div>
            <div class="cart__form-block">
              <p class="cart__form-text">Телефон</p>
              <the-mask :mask="['+7 (###) ##-##-###']" v-model="number" class="cart__form-input"
                        :class="{'cart__form-error': this.number_check}"/>
              <p class="error" :class="{'error-view': this.number_check}">Телефон должен быть полным</p>
            </div>
          </div>
          <div class="cart__form-block">
            <p class="cart__form-text">Полный адрес</p>
            <input type="text" v-model="adress" class="cart__form-input cart__form-adress"
                   :class="{'cart__form-error': this.adress_check}">
            <p class="error" :class="{'error-view': this.adress_check}">Адрес не должен быть пустым</p>
          </div>
          <button type="submit" class="cart__form-button">Заказать</button>
        </form>
      </div>
      <div class="cart__access" v-else-if="access">
        <img src="../../assets/accept_dart.png" alt="" class="cart__access-image">
        <p class="cart__access-text">Заказ успешно создан</p>
      </div>
      <div class="cart__empty" v-else>
        <img src="../../assets/cart.png" alt="" class="cart__empty-image">
        <p class="cart__empty-text">В корзине ничего нет</p>
      </div>
    </div>

  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import {TheMask} from 'vue-the-mask'

export default {
  data() {
    return {
      developmnet: true,
      number: '',
      name: '',
      adress: '',
      number_check: false,
      name_check: false,
      adress_check: false,
      length: 0,
      access: false,
    }
  },
  computed: mapGetters(['cart', 'cartLength']),
  methods: {
    ...mapActions({
      removeCart: 'removeCart',
      fetchCart: 'fetchCart',
      fetchData: 'fetchData',
      sendOrder: 'sendOrder'
    }),
    removeCarts(id) {
      this.removeCart(id)
      this.fetchCart()
      this.fetchData()
    },
    async send_form() {
      if (
          this.number.toString().trim().length != 0 || this.number.toString().length == 10 &&
          this.adress.toString().trim().length != 0 &&
          this.name.toString().trim().length != 0
      ) {
        const data = {'number': "+7" + this.number, 'name': this.name, 'adress': this.adress}
        this.sendOrder(data)
        this.access = true
        this.number = ''
        this.name= ''
        this.adress = ''
        await this.fetchCart()
        await this.fetchData()
      }
    }
  },
  watch: {
    number() {
      if (this.number.toString().trim().length == 0 || this.number.toString().length != 10) {
        this.number_check = true
      } else {
        this.number_check = false
      }
    },
    adress() {
      if (this.adress.toString().trim().length == 0) {
        this.adress_check = true
      } else {
        this.adress_check = false
      }
    },
    name() {
      if (this.name.toString().trim().length == 0) {
        this.name_check = true
      } else {
        this.name_check = false
      }
    }
  },
  components: {
    TheMask
  }
}
</script>
<style lang="scss" src="./style/cart.scss" scoped/>