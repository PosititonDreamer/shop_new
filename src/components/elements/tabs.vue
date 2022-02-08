<template>
  <div class="tabs">
    <div class="tabs__list">
      <tab-button
          v-for="item in items"
          :class="['tabs__list-button', {
            'tabs__list-active': item == activeTabName
          }]"
          :key="item"
          @click="selectTab(item)">
        {{ item }}
      </tab-button>
    </div>
    <slot/>
  </div>
</template>

<script>
import tabButton from '@/components/elements/tabs/button'

export default {
  data: () => ({
    items: [],
    activeTabName: '',
  }),

  props: ['item'],
  mounted() {
    this.items = this.$children.map(item => item.name)
    this.activeTabName = this.items[0]
    this.selectActive()
  },
  methods: {
    selectActive() {
      this.$children.forEach(tab => {
        if (tab.name === this.activeTabName) {
          tab.$data.isActive = true;
        } else {
          tab.$data.isActive = false
        }
      })
    },
    selectTab(item) {
      this.activeTabName = item
      this.selectActive()
    }
  },
  components: {
    tabButton
  }
}
</script>