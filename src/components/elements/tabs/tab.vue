<template>
  <div class="tabs__item">
    <slot v-if="isActive"></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  props: {
    name: String,
  },

  mounted() {

  }

}
</script>