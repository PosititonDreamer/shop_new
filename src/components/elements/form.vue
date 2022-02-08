<template>
  <form @submit.prevent="$emit('click')">
    <slot/>
  </form>
</template>