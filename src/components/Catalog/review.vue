<template>
  <div class="review">
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
</template>
<script>
export default {
  props: ['item'],

}
</script>