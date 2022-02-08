<template>
  <input
      @input="$emit('input', $event.target.value)"
      :value="value"
  >
</template>
<script>
export default {
  props: ['value'],
}
</script>