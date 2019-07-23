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
  overflow-y: auto;

  .i-table:nth-last-child(1) {
    padding-bottom: 2rem;
  }
}
</style>
