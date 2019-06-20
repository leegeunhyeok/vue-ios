<template>
  <div id="app">
    <div>vue-ios</div>
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
  },
  mounted () {
    const metaContents = [
      'initial-scale=1.0',
      'width=device-width',
      'user-scalable=no',
      'maximum-scale=1'
    ]
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = metaContents.join(',')
    document.head.appendChild(meta)
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
