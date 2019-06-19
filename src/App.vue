<template>
  <div id="app">
    <iToggle :value="value" @onChange="value = $event"/>
  </div>
</template>

<script>
import iToggle from '@/components/iToggle/iToggle'

export default {
  name: 'app',
  data () {
    return {
      value: false
    }
  },
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
