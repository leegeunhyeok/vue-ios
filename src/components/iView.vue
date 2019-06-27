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

  .i-secction:nth-child(1) {
    padding-top: 2rem;
  }
}
</style>
