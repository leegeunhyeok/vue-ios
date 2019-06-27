<template>
  <div class="i-table">
    <div class="i-table__title" v-if="title">
      {{ title }}
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iTable',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-table {
  width: 100%;
  padding: 0 1rem;
  padding-top: 2rem;
  background-color: $light-background-color;

  .i-table__title {
    font-size: .86rem;
    text-align: left;
    color: $light-secondary-text-color;
  }
}
</style>
