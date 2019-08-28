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
.i-sub-view {
  width: 100%;

  & .i-view {
    position: absolute;
    top: 2.5rem;
  }
}
</style>
