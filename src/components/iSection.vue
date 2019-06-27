<template>
  <div class="i-section">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iSection'
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-section {
  width: 100%;
  padding: 0 1rem;
  padding-top: 2rem;
  background-color: $light-background-color;
}
</style>
