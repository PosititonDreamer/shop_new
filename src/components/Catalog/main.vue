<template>
  <div class="Catalog">
    <Loader  v-if="Loader"/>
    <nav class="sidebar" v-else-if="childrenArray.length" >
      <ul class="sidebar__list">
        <li v-for="item in childrenArray" :key="item.id" class="sidebar__item">
          <v-button
            :name="item.name"
            :class="['sidebar__button', {'sidebar__button-active': item.id === idCategory}]"
            @click="takeCategory(item.id)"
          />
        </li>
      </ul>
    </nav>
    <out-catalog :id="idCategory" v-if="childrenArray.length" />
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import Loader from '@/components/Loader/Loader'
import outCatalog from '@/components/Catalog/Catalog'
import vButton from "@/components/elements/button"

export default {
  data() {
    return {
      Loader: true,
      idCategory: 0,
      childrenArray: []
    }
  },

  props: ['id'],
  methods: {
    takeCategory(id) {
      this.idCategory = id;
    }
  },
  computed: {
    ...mapGetters(['children']),

  },
  watch:{
    async id(){
      this.Loader = true
      this.childrenArray = await this.children.filter(el=>el.parent_id == this.id)
      this.idCategory = this.childrenArray[0].id
      this.Loader= false
    }
  },
  async mounted() {
    this.childrenArray = await this.children.filter(el=>el.parent_id == this.id)
    this.idCategory = this.childrenArray[0].id
    this.Loader= false
  },
  components: {
    Loader, outCatalog, vButton
  },
}
</script>
<style lang="scss" src="./style/sidebar.scss" scoped />