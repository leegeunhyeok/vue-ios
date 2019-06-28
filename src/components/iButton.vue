<template>
  <button class="i-button" @click="click">
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

.i-button {
  cursor: pointer;
  outline: none;
  border: none;
  color: $ios-blue-color;
  background-color: transparent;
  font-size: 1rem;
  padding: .5rem 1rem;
  -webkit-transition: $transition-speed;
     -moz-transition: $transition-speed;
      -ms-transition: $transition-speed;
       -o-transition: $transition-speed;
          transition: $transition-speed;

  &:hover {
    color: $ios-lightblue-color;
  }
}
</style>
