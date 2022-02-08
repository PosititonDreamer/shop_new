<template>
  <div class="products__item">
    <img :src="item.img" alt="" class="products__image"  @click="$emit('open-product', item)">
    <div class="products__item-description">
      <p class="products__name" @click="$emit('open-product', item)">{{ item.name }}</p>
      <p class="products__price">{{ item.price }} ₽</p>
      <v-button v-if="item.completed"
                :class="'products__button'"
                :name="'В корзине'"
                @click="$emit('remove-carts', item)"
      >
        <img src="../../assets/accept.png" alt="" class="products__button-image">
      </v-button>

      <v-button v-else
                :class="'products__button'"
                :name="'Добавить в корзину'"
                @click="$emit('add-carts', item)"
      />
    </div>
  </div>

</template>
<script>
import vButton from '@/components/elements/button'
export default {
  props: ['item'],
  components: {
    vButton
}

}
</script>