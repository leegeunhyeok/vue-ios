<template>
  <div class="i-view" :class="viewType">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iView',
  props: {
    type: {
      type: String
    }
  },
  computed: {
    viewType () {
      return {
        main: this.type === 'main'
      }
    }
  }
}

</script>

<style lang="scss">
.i-view {
  height: 100%;

  @media only screen and (min-width: 320px) {
    & {
      width: 100%;
    }

    &.main {
      width: 100%;
    }
  }

  @media only screen and (min-width: 700px), screen and (min-width: 768px) {
    & {
      float: right;
      width: 70%;
    }

    &.main {
      float: left;
      width: 30%;
    }
  }

  .i-table:nth-last-child(1) {
    padding-bottom: 2rem;
  }
}
</style>
