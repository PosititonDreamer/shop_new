<template>
  <div id="app">
    <Loader v-if="Loader" />
    <current-header  v-else-if="parent.length" />
    <p v-else>no Item</p>
    <router-view v-if="parent.length" />
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex"
  import CurrentHeader from '@/components/header/header'
  import Loader from '@/components/Loader/Loader'
  export default {
    name: "app",
    data() {
      return {
        Loader: true
      }
    },
    methods: {
      ...mapActions([ 'fetchData', 'fetchCart']),
      async acceptReview() {
        this.Loader = true
        await this.fetchData()
        this.Loader = false
      }
    },
    computed: mapGetters(['parent']),
    async mounted() {
      await this.fetchData()
      if(this.$route.path === '/') {
        this.$router.push({path: '/CurrentCategory/'+ this.parent[0]['id']})
      }
      await this.fetchCart()
      this.Loader = false
    },
    components: {
      CurrentHeader,
      Loader
    }
  }
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style-type: none;
}

</style>
