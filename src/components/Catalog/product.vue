<template>
  <div class="products__open">
    <div class="product">
      <div class="product__item">
        <p class="product__item-info">Информация</p>
        <v-button
            :class="'product__item-button'"
            @click="$emit('closeProduct')"
        >
          <img src="../../assets/close.png" alt="" class="product__item-close">
        </v-button>
      </div>
      <img :src="product.img" alt="" class="product__image">
      <p class="product__name">{{ product.name }}</p>
      <p class="product__price">{{ product.price }} ₽</p>
      <v-tabs>
        <v-tab name="description">
          <p class="tabs__item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias deleniti
            dolor doloribus facere, impedit in iste iure mollitia nam nemo odio perferendis qui quibusdam quod
            recusandae sequi ullam velit voluptas.</p>
        </v-tab>
        <v-tab name="props">
          <p v-for="prop in product.props" :key="prop.id" class="tabs__item-props">
            <span class="tabs__item-prop">{{ prop.caption }}</span>
            <span class="tabs__item-prop">{{ prop.value }} {{ prop.measure }}</span>
          </p>
        </v-tab>
        <v-tab name="reviews">
          <review
              v-for="item in product.reviews"
              :key="item.id"
              :item="item"
          />
        </v-tab>
        <v-tab name="form">
          <v-form
              @click="acceptReview"
              :class="'form'"
          >
            <p class="form__text">Оценка</p>
            <div class="form__rate">
              <button type="button" v-for="n in 5" @click="takeRate(n)" class="form__button">
                <img v-if="n <= formData.rate" src="../../assets/gold_star.png" alt="" class="form__button-image">
                <img v-else src="../../assets/star.png" alt="" class="form__button-image">
              </button>
            </div>
            <p class="form__text">Имя</p>
            <v-input
                :class="'form__input'"
                v-model="formData.author"
            />
            <p class="form__text">Отзыв</p>
            <v-textarea
                :class="'form__textarea'"
                v-model="formData.text"
            />
            <v-button v-if="buttonSubmit"
                      :class="'form__button-review'"
                      :name="'Отправить отзыв'"
                      :type="'submit'"
            />
            <v-button v-else
                      :class="'form__button-review form__button-disabled'"
                      :name="'...'"
                      :disabled=true
            />
          </v-form>
        </v-tab>
      </v-tabs>
<!--      <div class="tabs">-->
<!--        <ul class="tabs__list">-->
<!--          <li @click="openTab(0)" class="tabs__list-button" :class="{'tabs__list-active': tab === 0}">Описание</li>-->
<!--          <li @click="openTab(1)" class="tabs__list-button" :class="{'tabs__list-active': tab === 1}">Характеристики-->
<!--          </li>-->
<!--          <li @click="openTab(2)" class="tabs__list-button" :class="{'tabs__list-active': tab === 2}">Отзывы</li>-->
<!--          <li @click="openTab(3)" class="tabs__list-button" :class="{'tabs__list-active': tab === 3}">Оставить отзыв-->
<!--          </li>-->
<!--        </ul>-->
<!--        <div class="tabs__item" v-if="tab == 0">-->
<!--          <p class="tabs__item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias deleniti-->
<!--            dolor doloribus facere, impedit in iste iure mollitia nam nemo odio perferendis qui quibusdam quod-->
<!--            recusandae sequi ullam velit voluptas.</p>-->
<!--        </div>-->
<!--        <div class="tabs__item" v-else-if="tab == 1">-->
<!--          <p v-for="prop in product.props" :key="prop.id" class="tabs__item-props">-->
<!--            <span class="tabs__item-prop">{{ prop.caption }}</span>-->
<!--            <span class="tabs__item-prop">{{ prop.value }} {{ prop.measure }}</span>-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="tabs__item" v-else-if="tab == 2">-->
<!--          <review-->
<!--              v-for="item in product.reviews"-->
<!--              :key="item.id"-->
<!--              :item="item"-->
<!--          />-->

<!--        </div>-->
<!--        <div class="tabs__item" v-else-if="tab == 3">-->
<!--      -->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import vButton from '@/components/elements/button'
import vInput from '@/components/elements/input'
import vTextarea from '@/components/elements/textarea'
import review from '@/components/Catalog/review'
import vForm from '@/components/elements/form'
import vTabs from '@/components/elements/tabs'
import vTab from "@/components/elements/tabs/tab"

export default {
  props: {
    product: []
  },
  data() {
    return {
      tab: 0,
      buttonSubmit: true,
      formData: {
        id: this.product['id'],
        rate: 0,
        text: '',
        author: '',
        avatar: 'https://loremflickr.com/60/60'
      },
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
      let formData = {...this.formData}
      this.product.reviews.push(formData)
      this.addReview(formData)
      this.formData.rate = 0
      this.formData.author = this.formData.text = ''
      this.buttonSubmit = true
    },
  },
  components: {
    vTab,
    vButton, vInput, vTextarea, review, vForm, vTabs
  }

}
</script>
<style lang="scss" src="./style/product.scss" />

