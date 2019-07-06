<template>
  <button class="i-button"
    :class="{ bold }"
    @click="click"
  >
    <slot/>
  </button>
</template>

<script>
import button from '@/mixins/button'

export default {
  name: 'iButton',
  mixins: [ button ]
}
</script>

<style lang="scss">
@import '../common/style/common.scss';
@import '../common/style/mixin.scss';

.i-button {
  @include tap-highlight-disable;
  cursor: pointer;
  outline: none;
  border: none;
  color: $ios-blue-color;
  background-color: transparent;
  font-size: 1rem;
  padding: .5rem 1rem;

  &.bold {
    font-weight: bold;
  }

  &:hover {
    color: $ios-lightblue-color;
  }
}
</style>
