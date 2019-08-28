<template>
  <div class="i-table-item"
    :class="{ selectable }"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iTableItem',
  props: {
    selectable: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-table-item {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: .3rem 1rem;
  vertical-align: top;
  background-color: $light-pure-color;

  &.selectable {
    &:focus {
      background-color: $light-pure-color;
    }

    &:hover:active {
      background-color: $light-background-selected-color;
    }
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: calc(100% - 1rem);
    height: 1px;
    background-color: $light-border-color;
  }

  .left {
    margin-right: auto;

    &.i-button {
      padding-left: 0;
    }
  }

  .right {
    margin-left: auto;

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
