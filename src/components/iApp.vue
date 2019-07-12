<template>
  <div class="i-app">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iApp'
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
