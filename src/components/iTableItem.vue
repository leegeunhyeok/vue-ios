<template>
  <div class="i-table-item">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iTableItem'
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-table-item {
  display: inline-block;
  position: relative;
  width: 100%;
  padding: .5rem 1rem;
  background-color: $light-pure-color;
  border-top: 1px solid $light-border-color;
  vertical-align: top;

  .left {
    float: left;

    &.i-button {
      padding-left: 0;
    }
  }

  .right {
    float: right;

    &.i-button {
      padding-right: 0;
    }
  }

  .center {
    float: none;
    text-align: center;
    margin: 0 auto;
  }

  .i-label {
    line-height: 2.2rem;
  }
}
</style>
