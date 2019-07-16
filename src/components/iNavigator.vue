<template>
  <transition-group name="navigate">
    <slot/>
  </transition-group>
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
