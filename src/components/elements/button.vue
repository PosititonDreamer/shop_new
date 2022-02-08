<template>
  <button @click="$emit('click')">{{ name }}<slot /></button>
</template>
<script>
export default {
  props: ['name'],
}
</script>