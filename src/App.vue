<template>
  <div id="app">
    <iToggle></iToggle>
  </div>
</template>

<script>
import iToggle from '@/components/iToggle/iToggle'

export default {
  name: 'app',
  components: {
    iToggle
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
