<template>
  <div class="products__open">
    <div class="product">
      <div class="product__item">
        <p class="product__item-info">Информация</p>
        <button class="product__item-button" @click="$emit('closeProduct')"><img src="../../assets/close.png" alt=""
                                                                                 class="product__item-close"></button>
      </div>
      <img :src="product.img" alt="" class="product__image">
      <p class="product__name">{{ product.name }}</p>
      <p class="product__price">{{ product.price }} ₽</p>
      <div class="tabs">
        <ul class="tabs__list">
          <li @click="openTab(0)" class="tabs__list-button" :class="{'tabs__list-active': tab === 0}">Описание</li>
          <li @click="openTab(1)" class="tabs__list-button" :class="{'tabs__list-active': tab === 1}">Характеристики
          </li>
          <li @click="openTab(2)" class="tabs__list-button" :class="{'tabs__list-active': tab === 2}">Отзывы</li>
          <li @click="openTab(3)" class="tabs__list-button" :class="{'tabs__list-active': tab === 3}">Оставить отзыв
          </li>
        </ul>
        <div class="tabs__item" v-if="tab == 0">
          <p class="tabs__item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias deleniti
            dolor doloribus facere, impedit in iste iure mollitia nam nemo odio perferendis qui quibusdam quod
            recusandae sequi ullam velit voluptas.</p>
        </div>
        <div class="tabs__item" v-else-if="tab == 1">
          <p v-for="prop in product.props" :key="prop.id" class="tabs__item-props">
            <span class="tabs__item-prop">{{ prop.caption }}</span>
            <span class="tabs__item-prop">{{ prop.value }} {{ prop.measure }}</span>
          </p>
        </div>
        <div class="tabs__item" v-else-if="tab == 2">
          <div class="review" v-for="item in product.reviews" :key="item.id">
            <!--            {{item}}-->
            <img :src="item.avatar" alt="" class="review__avatar">
            <div class="review__props">
              <div class="review__name">
                <p class="review__author">{{ item.author }}</p>
                <div class="review__rate">
                  <span v-for="n in 5">
                    <img v-if="n <= item.rate" src="../../assets/gold_star.png" alt="" class="review__rate-image">
                    <img v-else src="../../assets/star.png" alt="" class="review__rate-image">
                  </span>
                </div>
              </div>
              <p class="review__description"> {{ item.text }}</p>
            </div>
          </div>
        </div>
        <div class="tabs__item" v-else-if="tab == 3">
          <form class="form" @submit.prevent="acceptReview">
            <p class="form__text">Оценка</p>
            <div class="form__rate">
              <button type="button" v-for="n in 5" @click="takeRate(n)" class="form__button">
                <img v-if="n <= formData.rate" src="../../assets/gold_star.png" alt="" class="form__button-image">
                <img v-else src="../../assets/star.png" alt="" class="form__button-image">
              </button>
            </div>
            <p class="form__text">Имя</p>
            <input type="text" class="form__input" v-model="formData.author">
            <p class="form__text">Отзыв</p>
            <textarea class="form__textarea" v-model="formData.text"></textarea>
            <button v-if="buttonSubmit" type="submit" class="form__button-review">Отправить отзыв</button>
            <button type="button" disabled v-else class="form__button-review form__button-disabled">...</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  props: {
    product: []
  },
  data() {
    return {
      tab: 0,
      buttonSubmit: true,
      formData: {
        rate: 0,
        text: '',
        author: ''
      }
    }
  },

  methods: {
    ...mapActions(['addReview']),
    openTab(number) {
      this.tab = number
    },
    takeRate(number) {
      this.formData.rate = number
    },
    async acceptReview() {
      this.buttonSubmit = false
      console.log(this.formData, 1)
      this.formData.id = this.product['id']
      console.log(this.formData, 2)
      this.product.reviews.push(this.formData)
      this.addReview(this.formData)
      console.log(this.formData, 3)
      this.formData.rate = this.formData.id = 0
      this.formData.author = this.formData.text = ''
      this.buttonSubmit = true

    }
  }

}
</script>
<style lang="scss" src="./style/product.scss" scoped/>

