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
  position: relative;
  display: inline-block;
  width: 100%;
  background-color: $light-pure-color;
  border-top: 1px solid $light-border-color;
  padding: .5rem 1rem;
  vertical-align: top;

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .i-label {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
       -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
         -o-transform: translateY(-50%);
            transform: translateY(-50%);
  }
}
</style>
