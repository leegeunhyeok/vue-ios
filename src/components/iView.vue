<template>
  <div class="i-view">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iView'
}

</script>

<style lang="scss">
.i-view {
  width: 100%;
  height: 100%;

  .i-section:nth-last-child() {
    padding-bottom: 2rem;
  }
}
</style>
