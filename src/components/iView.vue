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
  position: absolute;
  height: 100%;
  overflow-y: auto;

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
      right: 0;
      width: 70%;
    }

    &.main {
      left: 0;
      width: 30%;
    }
  }

  .i-table:nth-last-child(1) {
    padding-bottom: 2rem;
  }
}
</style>
