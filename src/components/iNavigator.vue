<template>
  <transition name="navigate">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'iNavigator'
}
</script>

<style lang="scss">
@import '../common/style/transition-navigate.scss';
@import '../common/style/common.scss';

</style>
