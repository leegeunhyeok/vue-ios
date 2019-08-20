<template>
  <div class="i-sub-view">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iSubView'
}

</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-app {
  .i-sub-view {
    position: relative;
    height: 100%;
    overflow-y: auto;

    & {
      @media only screen and (min-width: 320px) {
        width: 100%;
      }

      @media only screen and (min-width: 700px), screen and (min-width: 768px) {
        border-right: 1px solid $light-border-color;
        width: 63%;
        float: right;
      }
    }
  }
}
</style>
