<template>
  <div class="i-label">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iLabel'
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-label {
  display: inline-block;
  color: $light-primary-text-color;
  font-size: 1rem;
}
</style>
