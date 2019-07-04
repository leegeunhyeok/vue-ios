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
  padding-top: 2rem;
  background-color: $light-background-color;

  &__title {
    padding: 0 1rem;
    margin-bottom: .4rem;
    font-size: .86rem;
    text-align: left;
    color: $light-secondary-text-color;
  }

  .i-table-item {
    border-top: 1px solid $light-border-color;
  }

  & > .i-table-item ~ .i-table-item {
    border: none;
  }

  .i-table-item:last-child {
    border-bottom: 1px solid $light-border-color;

    &::before {
      width: 0;
      height: 0;
    }
  }
}
</style>
