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
  width: 100%;
  height: 100%;

  @media only screen and (min-width: 320px) {
    &.main {
      width: 100%;
    }
  }

  @media only screen and (min-width: 700px) {
    &.main {
      float: left;
      width: 40%;
    }
  }

  @media only screen and (min-width: 768px) {
    &.main {
      float: left;
      width: 36%;
    }
  }

  @media only screen and (min-width: 1224px) {
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
