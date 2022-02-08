<template>
  <div class="openCart">
    <div class="cart">
      <div class="cart__item">
        <p class="cart__item-info">Оформить заказ</p>
        <v-button
            :class="'cart__item-button'"
            @click="$emit('takeCart')"
        >
          <img src="../../assets/close.png" alt="" class="cart__item-close">
        </v-button>
      </div>
      <div class="order" v-if="!access && cartLength > 0">
        <p class="cart__text">В корзине: </p>
        <div class="cart__products">
          <div class="cart__products-item" v-if="cartLength > 0" v-for="item in cart" :key="item.id">
            <img :src="item.img" alt="" class="cart__products-image">
            <div class="cart__products-description">
              <p class="cart__products-name">{{ item.name }}</p>
              <p class="cart__products-price">{{ item.price }} ₽</p>
              <v-button
                  :class="'cart__products-button'"
                  :name="'Убрать из корзины'"
                  @click="removeCarts(item)"
              />
            </div>
          </div>
        </div>
        <v-form
            :class="'cart__form'"
            @click="send_form"
        >
          <div class="cart__form-blocks">
            <div class="cart__form-block">
              <p class="cart__form-text">Имя</p>
              <v-input
                  :type="'text'"
                  :class="['cart__form-input',{'cart__form-error cart__form-input': this.name_check,}]"
                  v-model="name"
              />
              <v-error
                  :name="'Имя не должно быть пустым'"
                  :class="['error', {'error-view': this.name_check}]"
              />
            </div>
            <div class="cart__form-block">
              <p class="cart__form-text">Телефон</p>
              <the-mask
                  :mask="['+7 (###) ##-##-###']"
                  v-model="number"
                  :class="['cart__form-input', {'cart__form-error': this.number_check}]"
              />
              <v-error
                  :name="'Телефон должен быть полным'"
                  :class="['error', {'error-view': this.number_check}]"
              />
            </div>
          </div>
          <div class="cart__form-block">
            <p class="cart__form-text">Полный адрес</p>
            <v-input
                :type="'text'"
                :class="['cart__form-input cart__form-adress', {'cart__form-error': this.adress_check,}]"
                v-model="adress"
            />
            <v-error
                :name="'Адрес не должен быть пустым'"
                :class="['error', {'error-view': this.adress_check}]"
            />
          </div>
          <v-button
              :class="'cart__form-button'"
              :name="'Заказать'"
          />
        </v-form>
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
import vButton from '@/components/elements/button'
import vInput from '@/components/elements/input'
import vError from "@/components/elements/error"
import vForm from "@/components/elements/form"

export default {
  data() {
    return {
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
      this.fetchData().then(() => {
        this.fetchCart()
      })
    },
    send_form() {
      if (
          this.number.toString().trim().length != 0 || this.number.toString().length == 10 &&
          this.adress.toString().trim().length != 0 &&
          this.name.toString().trim().length != 0
      ) {
        const data = {'number': "+7" + this.number, 'name': this.name, 'adress': this.adress}
        this.sendOrder(data)
        this.access = true
        this.number = ''
        this.name = ''
        this.adress = ''
        this.fetchCart().then(() => {
          this.fetchData()
        })


      }
    }
  },
  watch: {
    number(value, oldvalue) {
      if (value.toString().trim().length == 0 || value.toString().length != 10) {
        this.number_check = true
      } else {
        this.number_check = false
      }
    },
    adress(value, oldvalue) {
      if (value.toString().trim().length == 0) {
        this.adress_check = true
      } else {
        this.adress_check = false
      }
    },
    name(value, oldvalue) {
      if (value.toString().trim().length == 0) {
        this.name_check = true
      } else {
        this.name_check = false
      }
    }
  },
  components: {
    TheMask, vButton, vInput, vError, vForm
  }
}
</script>
<style lang="scss" src="./style/cart.scss" scoped/>